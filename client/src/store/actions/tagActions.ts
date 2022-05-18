import { Dispatch } from 'redux';
import * as api from '../../api/api'
import { TagsENUM } from '../types/tagTypes';




export const getTagsAction = () => async(dispatch: Dispatch) => {
    try {
        const {data} = await api.getTagsAPI()
        dispatch({type: TagsENUM.GET_TAGS, payload: data.tags})
    } catch (error) {
        console.log(error)
    }
}