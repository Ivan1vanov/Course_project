import { Action, Dispatch } from "redux";
import * as api from '../../api/api'
import { CollectionsENUM } from '../types/collectionTypes';
import { AxiosError } from 'axios';
import { UserENUM } from '../types/userTypes';


export const getCollectionsAction = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({type: CollectionsENUM.LOADING})
        const {data} = await api.getCollectionsAPI()
        dispatch({type: CollectionsENUM.GET_COLLECTIONS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getOneCollectionAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: CollectionsENUM.LOADING})
        const {data} = await api.getOneCollectionAPI(id)
      
        dispatch({type: CollectionsENUM.GET_ONE_COLLECTION, payload: data.collection})

    } catch (error) {
        console.log(error)
    }
}

export const createCollectionAction = (collData: any, navigate: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: CollectionsENUM.LOADING})
        const {data} = await api.createCollectionAPI(collData)
        dispatch({type: CollectionsENUM.CREATE_COLLECTION, payload: data.newCollection})
        navigate(`/collection/${data.newCollection._id}`)
    } catch (error) {
        const err: any = error as AxiosError
        console.log(err.response.data.message)
        if(err.response) {
            dispatch({type: UserENUM.LOGIN_ERROR, payload: err.response.data.message})
        }
    }
}

export const getCollectionsOfUserAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: CollectionsENUM.LOADING})
        const {data} = await api.getCollectionOfUserAPI(id)
        dispatch({type: CollectionsENUM.GET_COLLECTIONS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteCollectionAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        
        const {data} = await api.deleteCollectionAPI(id)
        dispatch({type: CollectionsENUM.DELETE_COLLECTION, payload: data.collection})

    } catch (error) {
        console.log(error)
    }
}

export const loadMoreAction = (page: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.getCollectionsLoadMoreAPI(page)
        dispatch({type: CollectionsENUM.LOAD_MORE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getBigestCollectionsAction = () => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.bigestCollectionsAPI()
        dispatch({type: CollectionsENUM.BIGEST_COLLECTIONS, payload: data.collections})
    } catch (error) {
        console.log(error)
    }
}
