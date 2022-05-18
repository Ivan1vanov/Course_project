import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { collectionReducer } from './reducers/collectionReducer';
import { itemReducer } from './reducers/itemReducer';
import { userReducer } from './reducers/userReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { tagsReducer } from './reducers/tagsReducer';

const reducers = combineReducers({
    collections: collectionReducer,
    items: itemReducer,
    user: userReducer,
    settings: settingsReducer,
    tags: tagsReducer
})


export const store = createStore(reducers, compose(applyMiddleware(thunk)))


