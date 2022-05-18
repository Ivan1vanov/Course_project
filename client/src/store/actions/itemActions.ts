import { Dispatch } from 'redux';
import * as api from '../../api/api'
import { ItemENUM } from '../types/itemsType';
import { AxiosError } from 'axios';
import { UserENUM } from '../types/userTypes';
import { useNavigate } from 'react-router-dom';

 
export const getItemAction = (id: string | undefined, sortBy?: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ItemENUM.LOADING})
        const {data} = await api.getItemsAPI(id, sortBy)
        dispatch({type: ItemENUM.GET_ITEMS, payload: data.items})
    } catch (error) {
        console.log(error)
    }
}

export const createItemAction = (itemData: any) => async (dispatch: Dispatch) => {
        try {
            const {data} = await api.createItemAPI(itemData)
            dispatch({type: ItemENUM.CREATE_ITEM, payload: data.item})
        } catch (error) {
            console.log(error)
        }
}

export const getOneItemAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ItemENUM.LOADING})
        const {data} = await api.getOneItemAPI(id)
        dispatch({type: ItemENUM.GET_ONE_ITEM, payload: data.item})
    } catch (error) {
        console.log(error)
    }
}

export const likeItemAction = (id: string | undefined, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.likeItem(id)
        dispatch({type: ItemENUM.LIKE_ITEM, payload: data.item})
    } catch (error) {
        const err: any = error as AxiosError 
        if (err.response) {
            dispatch({type: UserENUM.LOGOUT})
            navigate('/auth')
            dispatch({type: UserENUM.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}

export const likeItemPageAction = (id: string | undefined, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.likeItem(id)
        dispatch({type: ItemENUM.LIKE_ITEM_PAGE, payload: data.item})
    } catch (error) {
        const err: any = error as AxiosError 
        if (err.response) {
            dispatch({type: UserENUM.LOGOUT})
            navigate('/auth')
            dispatch({type: UserENUM.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}

export const commentItemAction = (id: string | undefined, commentData: any, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.commentItemAPI(id, commentData)
        dispatch({type: ItemENUM.COMMENT_ITEM, payload: data.item})
    } catch (error) {
        const err: any = error as AxiosError 
        if (err.response) {
            dispatch({type: UserENUM.LOGOUT})
            navigate('/auth')
            dispatch({type: UserENUM.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}


export const deleteItemAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.delereItemAPI(id)
        dispatch({type: ItemENUM.DELETE_ITEM, payload: data.item})
    } catch (error) {
        console.log(error)
    }
}

export const updateItemAction = (id: string | undefined, itemData: any, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.updateItemAPI(id, itemData)
        dispatch({type: ItemENUM.UPDATE_ITEM, payload: data.item})
        navigate(`/item/${data.item._id}`)
    } catch (error) {
        console.log(error)
    }
}

export const searchItemsAction = (searchData: string | undefined, page: number) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ItemENUM.LOADING})
        const {data} = await api.searchItemsAPI(searchData, page)
        dispatch({type: ItemENUM.SEARCH_ITEMS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const searchItemByTagsAction = (tag: string, page: number) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ItemENUM.LOADING})
        const {data} = await api.searchItemsByTagAPI(tag, page)
        dispatch({type: ItemENUM.SEARCH_ITEMS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getLastItemsAction = () => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.getLastItemsAPI()
        dispatch({type: ItemENUM.GET_LAST_ITEMS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getLastItemsLoadMoreAction = (page: number) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.getLastItemsLoadMoreAPI(page)
        dispatch({type: ItemENUM.GET_LAST_ITEMS_LOAD_MORE, payload: data})
    } catch (error) {
        console.log(error)
    }
}