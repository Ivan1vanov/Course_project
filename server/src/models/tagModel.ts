import mongoose from "mongoose";



const tagSchema = new mongoose.Schema({
    tag: {type: String}
})

export const Tag = mongoose.model('Tag', tagSchema)