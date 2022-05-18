import express from 'express'
import userControlers from '../controlers/userControlers'
import { isBlocked } from '../midleware/isBlocked';

const userRouter = express.Router()

userRouter.get('/api/users', userControlers.getAllUsers)
userRouter.get('/api/users/one/:id', userControlers.getOneUser)

userRouter.post('/api/users/registration', userControlers.registration)
userRouter.post('/api/users/login', userControlers.login)

userRouter.post('/api/user/facebook', userControlers.loginWithFacebook)

userRouter.put('/api/users/block/:id', isBlocked, userControlers.blockUser)
userRouter.put('/api/users/active/:id', isBlocked, userControlers.activeUser)

userRouter.put('/api/users/admin/:id', isBlocked, userControlers.makeAdminUser)
userRouter.put('/api/users/disadmin/:id', isBlocked, userControlers.disadminUser)

userRouter.delete('/api/users/delete/:id', isBlocked, userControlers.deleteUser)

export default userRouter