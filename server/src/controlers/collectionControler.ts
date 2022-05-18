import { Request, Response } from "express";
import { Collection, CollectionInterface } from '../models/collectionModel';
import { Item } from '../models/itemModel';



import * as uuid from 'uuid'
import * as fs from 'fs'
import fsPromise from 'fs/promises'
import * as path from 'path'

const { cloudinary } = require('../../utils/cloudinary');

class CollectionController {
    
    async createCollection(req: Request | any, res: Response) {
        const {name, description, format, extraFileds, image} = req.body
    
        try {
        let fileName = ''
        if(image) {
            const uploadedREsponse = await cloudinary.uploader.upload(image)
        console.log(uploadedREsponse)
            fileName = uploadedREsponse.url
        }

        const newCollection = await Collection.create({
            name: name,
            description: description,
            format: format,
            creator: req.userId,
            image: fileName.split('/')[7],
            
        })
        extraFileds.map((field: any) => {
            newCollection.specifiedFields.push(field)
        })
 

        await newCollection.save()
        res.status(201).send({
            newCollection
        })

        } catch (error) {
            console.log(error)
        }
    }

    async getCollections(req: Request, res: Response) {
        try {
            const page = 1
            const LIMIT: number = 5
            const total = await Collection.countDocuments()

            const collections = await Collection.find().sort({_id: -1}).limit(LIMIT)
            res.status(200).send({
                collections,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getCollectionsPagination(req: Request, res: Response) {
        const {page} = req.query
    try {

        const LIMIT: number = 5
        const startIndex: number = (Number(page) - 1) * LIMIT
        const total = await Collection.countDocuments()

        const collections = await Collection.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)

        res.status(200).send({
            collections,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total / LIMIT)
        })
    } catch (error) {
        console.log(error)
    }
}


    async getOneCollection(req: Request, res: Response) {

        const {id} = req.params
        try {
            
            const collection = await Collection.findById(id)
            res.status(200).send({
                collection
            })
        } catch (error) {
            console.log(error)
        }
    }


    async getCollectionsOfUser(req: Request, res: Response) {
            const {id} = req.params
        try {
            const collections = await Collection.find({creator: id})
            res.status(200).send({
                collections
            })
        } catch (error) {
            console.log(error)
        }
    }


    async deleteCollection(req: Request, res: Response) {
        const {id} = req.params
        try {
            const collection: CollectionInterface | null = await Collection.findByIdAndDelete(id)

                if(collection?.image) {
                    const uploadedREsponse = await cloudinary.uploader.destroy(collection?.image.split('.')[0])
                    console.log(uploadedREsponse)    
                }
            

            await Item.deleteMany({collectionId: collection?._id})

           

            res.status(200).send({
                collection
            })
            

        } catch (error) {
            console.log(error)
        }
    }



    async getNameofCollection(req: Request, res: Response) {
        const {id} = req.params
        try {
            const collection = await Collection.findById(id)

            res.status(200).send({
                name: collection.name
            })
        } catch (error) {
            
        }
    }

    async getBigestCollections(req: Request, res: Response) {
        try {
            const collections = await Collection.find().sort({items: -1}).limit(5)

            res.status(200).send({
                collections
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new CollectionController()