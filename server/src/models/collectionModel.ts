import mongoose from "mongoose";


export interface CollectionInterface extends mongoose.Document {
    _id: mongoose.ObjectId,
    name: string,
    description: string, 
    format: string,
    creator: string,
    image: string,
    items: number,
    specifiedFields: any,
    createdAt: Date,
    updatedAt: Date,
}


const collectionSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String}, 
    format: {type: String},
    creator: {type: String},
    image: {type: String},
    items: {type: Number, default: 0},
    specifiedFields: [
        {
            fieldName: {type: String},
            fieldType: {type: String} //
        }
    ]
}, {
    timestamps: true
})

export const Collection = mongoose.model('Collection', collectionSchema)

