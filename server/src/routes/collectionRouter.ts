import express from 'express'
import collectionControler from '../controlers/collectionControler';
import { isBlocked } from '../midleware/isBlocked';

const collectionRouters = express.Router()


collectionRouters.post('/api/collection', isBlocked, collectionControler.createCollection)
collectionRouters.get('/api/collection/bigest', collectionControler.getBigestCollections)
collectionRouters.get('/api/collection/name/:id', collectionControler.getNameofCollection)
collectionRouters.get('/api/collection/pagination', collectionControler.getCollectionsPagination)
collectionRouters.get('/api/collection', collectionControler.getCollections)
collectionRouters.get('/api/collection/:id', collectionControler.getOneCollection)
collectionRouters.get('/api/collection/user/:id', collectionControler.getCollectionsOfUser)
collectionRouters.delete('/api/collection/:id', collectionControler.deleteCollection)

export default collectionRouters