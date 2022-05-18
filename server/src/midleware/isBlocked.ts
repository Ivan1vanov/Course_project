

import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import config from 'config'
import { User, UserInterface } from '../models/userModel';

export const isBlocked = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(token) {
            const decodedData: any = jwt.verify(token, config.get<string>('jwtConfig'))
            req.userId = decodedData.id

            const user: UserInterface | null = await User.findById(decodedData.id)

            if(user?.isBlocked === true) {
                res.status(404).send({
                    message: 'You have been blocked so you can not use this account anymore...'
                })
            } else {
                next()
            }
            
        } else {
            res.status(404).send({
                message: 'Unauthenticated.'
            })
        }
    } catch (error) {
        console.log(error)
    }
}