import mongoose from 'mongoose'



export interface UserInputData {
    name?: string,
    email: string,
    password: string,
}

export interface UserInterface extends UserInputData, mongoose.Document {
        isAdmin: boolean,
        isBlocked: boolean,
        lastLogin: Date,
        _id: mongoose.ObjectId 
}


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    isBlocked: {type: Boolean, default: false},
    lastLogin: {type: Date, default: new Date()}
})


export const User = mongoose.model('User', userSchema)

