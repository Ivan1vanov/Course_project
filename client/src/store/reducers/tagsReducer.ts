import { TagTypes, TagsENUM } from '../types/tagTypes';


const initializeState = {
    tags: ''
}

export const tagsReducer = (state = initializeState, action: TagTypes) => {
    switch (action.type) {
        case TagsENUM.GET_TAGS:
            return {
                tags: action.payload
            }

        default:
            return state
    }
}