import { Express } from "express"
import tagControler from "../controlers/tagControler";
import userRouter from "./userRouter";
import collectionRouters from "./collectionRouter";
import itemRouters from './itemRouter';



export const routes = (app : Express) => {
    //user
    app.use(userRouter)
    
    //collection
    app.use(collectionRouters)
  
    //item
    app.use(itemRouters)

    //tags
    app.get('/api/tags', tagControler.getTags)

}
