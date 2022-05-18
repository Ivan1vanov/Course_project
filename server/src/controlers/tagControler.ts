import { Request, Response } from "express"
import { Tag } from '../models/tagModel';



class TagController {

    async getTags(req: Request, res: Response) {
        try {
            const tags = await Tag.find().sort({_id: -1}).limit(10)
            res.status(202).send({
                tags
            })
        } catch (error) {   
            console.log(error)
        }
    }

}

export default new TagController()