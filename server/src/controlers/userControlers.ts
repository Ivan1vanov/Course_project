import {Request, Response} from 'express'
import { UserInputData, User, UserInterface } from '../models/userModel';
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import config from 'config'

import fetch from 'node-fetch'; 

const jwtTokenGenerator = (id: mongoose.ObjectId):string => {
    return jwt.sign({id}, config.get<string>('jwtConfig'), {expiresIn: '24h'})
}

class UserControlers { 

    async registration(req: Request, res: Response) {
            const data: UserInputData = req.body

            try {
                if(!data.email || !data.name || !data.password) {
                    res.status(404).send({
                        message: 'No, all fields are ruqiered...'
                    }) 
                }

                const user: UserInterface | null = await User.findOne({email: data.email})

                if(user) {
                    res.status(404).send({
                        message: 'User already exists'
                    })
                } else {
                        const hashPassword = bcrypt.hashSync(data.password, 6)

                        const newUser = await User.create({
                            name: data.name,
                            email: data.email,
                            password: hashPassword
                        })
                        await newUser.save()

                        const token = jwtTokenGenerator(newUser._id)

                        res.status(201).send({
                            user: newUser,
                            token
                        })
                }

            } catch (error) {
                console.log(error)
            }
    }   

    async login(req: Request, res: Response) {
        const data: UserInputData = req.body

        try {
            const user: UserInterface | null = await User.findOne({email: data.email})

            if(!user) {
                res.status(404).send({
                    message: 'User does not exist'
                })
            } else if (user.isBlocked === true) {
                    res.status(404).send({
                        message: 'User has been blocked...'
                    })
            } else {
                    const isPassword = bcrypt.compareSync(data.password, user.password)

                    if(!isPassword) {
                        res.status(404).send({
                            message: 'Invalid credentials'
                        })
                    } else {
                        user.set({  
                            lastLogin: new Date()
                        })
                        await user.save()

                        const token = jwtTokenGenerator(user._id)
                        res.status(200).send({
                            user,
                            token
                        })
                    } 
            }
        } catch (error) {
            console.log(error)
        }
    }   

    async getAllUsers(req: Request, res: Response) {
        const {page} = req.query
        try {
            const LIMIT: number = 4
            const startIndex: number = (Number(page) - 1) * LIMIT
            const total = await User.countDocuments()

            const users: UserInterface[] = await User.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)

            res.status(200).send({
                users,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT)
            })
        } catch (error) {
            console.log(error)
        }
    }


    async blockUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isBlocked: true
                })
                await user.save()
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async activeUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isBlocked: false
                })
                await user.save()
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    async makeAdminUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isAdmin: true
                })
                user.save()
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async disadminUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isAdmin: false
                })
                user.save()
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getOneUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user = await User.findById(id)
            res.status(202).send({
                user: user.name 
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findByIdAndDelete(id)
            res.status(203).send({
                user
            })
        } catch (error) {
            console.log(error)
        }
    }


    async loginWithFacebook(req: Request, res: Response) {
        const {accessToken, userID} = req.body
        try {
            if(!accessToken || !userID) {
                res.status(404).send({
                    message: 'Something went wrong...'
                })
            } else {
                const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`

                fetch(urlGraphFacebook, {
                    method: 'GET'
                })
                .then(res => res.json())
                .then(async (response) => {
                    if(response) {
                        const {name, email} = response
    
                    const user: any = await User.findOne({email: email})
                     
                        if(user) {
                            const token = jwtTokenGenerator(user._id)
                            res.status(202).send({
                                user,
                                token
                            })
                        } else {
                            const password = email + config.get<string>('jwtConfig')
                            const newUser = new User({
                                name: name,
                                email: email,
                                password: password
                            })
                            await newUser.save()
    
                            const token = jwtTokenGenerator(newUser._id)
                            res.status(202).send({
                                user: newUser,
                                token
                            })
                        }
                   
                    } else {
                        res.status(404).send({
                            message: 'Something wrong'
                        })
                    }
                })
            }
           
        } catch (error) {
            console.log(error)
        }
    }

}

export default new UserControlers()