import { Request, Response } from "express";
import { Collection } from "../models/collectionModel";
import { Item } from "../models/itemModel";
import { Tag } from "../models/tagModel";



class ItemControler {
    async createItem(req: Request, res: Response) {
        const {name, tags, collectionId, extraItemFields} = req.body

        try {
            const arrTags = tags.split(' ')

            const newItem = await Item.create({
                name: name,
                tags: tags, 
                collectionId: collectionId,
            })
         
            for(var key in extraItemFields) {
                newItem.extraItemFields.push({
                        extraItemName: key,
                        extraItemData: extraItemFields[key]
                })
            }
            
            const currentCollection = await Collection.findById(collectionId)
            currentCollection.set({
                items: currentCollection.items + 1
            })


            arrTags.map(async (tag: string) => {
                   const isTag = await Tag.find({tag: tag})

                    if(isTag.length === 0) {
                        const newTag = await Tag.create({tag: tag})
                        await newTag.save()
                    } 
            });

            currentCollection.save()
             newItem.save()

            res.status(201).send({
                item: newItem
            })

        } catch (error) {
            console.log(error)
        }
    }


    async getItemsOfCollection (req: Request, res: Response) {
        const {id} = req.params
        const {sort} = req.query

        try {
            console.log(sort)
            let items
            if(sort === 'date_from_the_latest') {
               items = await Item.find({collectionId: id}).sort({_id: -1})
            } else if(sort === 'date_from_early') {
                items = await Item.find({collectionId: id}).sort({_id: 1})
            } else if(sort === 'likes_from_the_most_popular') {
                items = await Item.find({collectionId: id}).sort({likes: -1})
            } else if(sort === 'likes_from_the_smallest') {
                items = await Item.find({collectionId: id}).sort({likes: 1})
            } else {
                items = await Item.find({collectionId: id})
            }
           
            res.status(200).send({
                items
            })

        } catch (error) {
            console.log(error)
        }
    }

    async getOneItem(req: Request, res: Response) {
        const {id} = req.params
        try {
            const item = await Item.findById(id)
            res.status(200).send({
                item
            })
        } catch (error) {
            console.log(error)
        }
    }


    async likeItem(req: Request | any, res: Response) {
        const {id} = req.params
        try {
            
            if(!req.userId) {
                res.status(400).json({message: 'Unauthenticated'})
            } else {
                const item = await Item.findById(id)
                const index = await item.likes.findIndex((id: string) => id === String(req.userId))
    
                if(index === -1) {
                    item.likes.push(req.userId)
                } else {
                    item.likes = item.likes.filter((id: string) => id !== String(req.userId))
                }
    
                const updatedItem = await Item.findByIdAndUpdate(id, item, {new: true})
    
                res.status(201).send({
                    item: updatedItem
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    async createComment(req: Request | any, res: Response) {
            const {id} = req.params
            const data = req.body

            try {
                const item = await Item.findById(id)
                item.comments.push({
                    commentCreator: req.userId,
                    comment: data.comment,
                    createdAt: data.createdAt                 
                })

                const commentedItem = await Item.findByIdAndUpdate(id, item, {new: true})

                await commentedItem.save()
                res.status(201).send({
                    item: commentedItem
                })
                
            } catch (error) {
                console.log(error)
            }
    }

    async deleteItem(req: Request, res: Response) {
        const {id} = req.params
        try {
            const item = await Item.findByIdAndDelete(id)

            const currentCollection = await Collection.findById(item.collectionId)
            currentCollection.set({
                items: currentCollection.items - 1
            })
            currentCollection.save()

            res.status(202).send({
                item
            })
        } catch (error) {
            console.log(error)
        }
    }

    async updateItem(req: Request, res: Response) {
        const {name, tags, extraItemFields} = req.body
        const {id} = req.params
        try {
         
            const item = await Item.findById(id)

            item.set({
                name: name,
                tags: tags,
                extraItemFields: [] 
            })

            for(var key in extraItemFields) {
                item.extraItemFields.push({
                        extraItemName: key,
                        extraItemData: extraItemFields[key]
                })
            }

            await item.save()

            res.status(202).send({
                item
            })

        } catch (error) {
            console.log(error)
        }
    }


    async searchItems(req: Request, res: Response) {
        const {search, page} = req.query
        try {
            const LIMIT: number = 5
            const startIndex: number = (Number(page) - 1) * LIMIT
            const total = await Item.countDocuments({$text: {$search: JSON.stringify(search)}})

            const items = await Item.find({$text: {$search: JSON.stringify(search)}}).sort({_id: -1}).limit(LIMIT).skip(startIndex)

            res.status(200).send({
                items,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async searcItemsByTag(req: Request, res: Response) {
        const {tag, page} = req.query
        try {
            const regTag = RegExp(`${tag}`, 'i')

            const LIMIT: number = 5
            const startIndex: number = (Number(page) - 1) * LIMIT
            const total = await Item.countDocuments({tags: {$regex: regTag}})
            
            const items = await Item.find({tags: {$regex: regTag}}).sort({_id: -1}).limit(LIMIT).skip(startIndex)

            res.status(200).send({
                items,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT)
            })
            
        } catch (error) {
            
        }
    }

    async getLastItems(req: Request, res: Response) {
        try {

            const LIMIT: number = 5
            const total = await Item.countDocuments()

            const items = await Item.find().limit(LIMIT).sort({_id: -1}).limit(LIMIT)

            res.status(202).send({
                items,
                numberOfPages: Math.ceil(total / LIMIT)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getItemsPagination(req: Request, res: Response) {
        const {page} = req.query
    try {

        const LIMIT: number = 5
        const startIndex: number = (Number(page) - 1) * LIMIT
        const total = await Item.countDocuments()

        const items = await Item.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)

        res.status(202).send({
            items,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total / LIMIT)
        })
    } catch (error) {
        console.log(error)
    }
}

}

export default new ItemControler()