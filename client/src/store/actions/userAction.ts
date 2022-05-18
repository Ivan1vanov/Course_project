import { AxiosError } from "axios";
import { Dispatch } from "redux";
import * as api from '../../api/api'
import { UserENUM } from '../types/userTypes';




export const loginAction = (userData: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.loginAPI(userData)
        dispatch({type: UserENUM.AUTH, payload: data})
    } catch (error) {
        const err: any = error as AxiosError
        console.log(err.response.data.message)
        if(err.response) {
            dispatch({type: UserENUM.LOGIN_ERROR, payload: err.response.data.message})
        }
    }
}   

export const registrationAction = (userData: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.registerAPI(userData)
        dispatch({type: UserENUM.AUTH, payload: data})
    } catch (error) {
        const err: any = error as AxiosError
        console.log(err.response.data.message)
        if(err.response) {
            dispatch({type: UserENUM.LOGIN_ERROR, payload: err.response.data.message})
        }
    }
}   

export const getOneUserAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.getOneUserAPI(id)
        dispatch({type: UserENUM.GET_ONE_USER, payload: data.user})
    } catch (error) {
        console.log(error)
    }
}

export const getUsersAction = (page?: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.getUsersAPI(page)
        dispatch({type: UserENUM.GET_USERS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const blockUserAction = (id: string | undefined, navigate: any) => async (dispatch: Dispatch) => {
    try {
        
        const {data} = await api.blockeUsersAPI(id)
        dispatch({type: UserENUM.CHANGE_STATUS, payload: data.user})

    } catch (error) {
        const err: any = error as AxiosError 
        if (err.response) {
            dispatch({type: UserENUM.LOGOUT})
            navigate('/auth')
            dispatch({type: UserENUM.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
    }



export const activeUserAction = (id: string | undefined, navigate: any) => async (dispatch: Dispatch) => {
    try {
        
        const {data} = await api.activeUsersAPI(id)
        dispatch({type: UserENUM.CHANGE_STATUS, payload: data.user})

    } catch (error) {
        console.log(error)
    }
}

export const adminRightsAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {

        const {data} = await api.adminRightsAPI(id)
        dispatch({type: UserENUM.CHANGE_STATUS, payload: data.user})
        
    } catch (error) {
        console.log(error)
    }
}


export const userRightsAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {

        const {data} = await api.userRightsAPI(id)
        dispatch({type: UserENUM.CHANGE_STATUS, payload: data.user})
        
    } catch (error) {
        console.log(error)
    }
}



export const loginWithFacebookAction = (someData: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.loginWithFacebookAPI(someData)
        dispatch({type: UserENUM.AUTH, payload: data})
    } catch (error) {
        const err: any = error as AxiosError
        console.log(err.response.data.message)
        if(err.response) {
            dispatch({type: UserENUM.LOGIN_ERROR, payload: err.response.data.message})
        }
    }
}

export const deleteUserAction = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        
        const {data} = await api.deleteUserAPI(id)
        dispatch({type: UserENUM.DELETE_USER, payload: data.user})

    } catch (error) {
        const err: any = error as AxiosError
        console.log(err.response.data.message)
        if(err.response) {
            dispatch({type: UserENUM.LOGIN_ERROR, payload: err.response.data.message})
        }
    }
}