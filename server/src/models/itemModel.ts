import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
    name: {type: String},
    tags: {type: String}, 
    collectionId: {type: String},
    extraItemFields: [
        {
            extraItemName: {type: String},
            extraItemData: {type: String}
        }
    ],
    likes: [String],
    comments: [ 
        {
            commentCreator: {type: String},
            comment: {type: String},
            createdAt: {type: Date}
        }
    ]
}, {
    timestamps: true
})

itemSchema.index({'$**': 'text'})
export const Item = mongoose.model('Item', itemSchema)

