import express from 'express'
import itemControler from '../controlers/itemControler'
import { isBlocked } from '../midleware/isBlocked';

const itemRouters = express.Router()


itemRouters.post('/api/item', itemControler.createItem)
itemRouters.get('/api/item/:id', itemControler.getItemsOfCollection)
itemRouters.get('/api/item/one/:id', itemControler.getOneItem)
itemRouters.put('/api/item/like/:id', isBlocked, itemControler.likeItem)
itemRouters.put('/api/item/comment/:id', isBlocked, itemControler.createComment)
itemRouters.delete('/api/item/:id', itemControler.deleteItem)
itemRouters.put('/api/item/update/:id', itemControler.updateItem)

itemRouters.get('/api/item/some/search', itemControler.searchItems)
itemRouters.get('/api/item/tag/search', itemControler.searcItemsByTag)

itemRouters.get('/api/item/all/last', itemControler.getLastItems)
itemRouters.get('/api/item/all/last/more', itemControler.getItemsPagination)

export default itemRouters