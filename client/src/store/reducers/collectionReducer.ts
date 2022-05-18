import { CollectionActionType, CollectionsENUM } from '../types/collectionTypes';



const initializeState: {
    collections: any,
    loading: any,
    collection: any,
    numberOfPages: number,
    currentPage: number,
    bigestCollections: any,
} = {
    loading: false,
    collections: [],
    collection: null,
    numberOfPages: 1,
    currentPage: 1,
    bigestCollections: [],
}

export const collectionReducer = (state = initializeState, action: CollectionActionType) => {
        switch (action.type) {
            case CollectionsENUM.GET_COLLECTIONS:

                    return {
                        ...state,
                        loading: false,
                        collections: action.payload.collections,
                        numberOfPages: action.payload.numberOfPages, 
                        currentPage: action.payload.currentPage
                    }
                
            case CollectionsENUM.LOAD_MORE: 
                    console.log(action.payload) 
            return {
                ...state,
                collections: [...state.collections, ...action.payload.collections],
                numberOfPages: action.payload.numberOfPages, 
                currentPage: action.payload.currentPage
            }

            case CollectionsENUM.LOADING: 
                return {
                    loading: true
                }

            case CollectionsENUM.GET_ONE_COLLECTION:
                return {
                    collection: action.payload
                }

            case CollectionsENUM.CREATE_COLLECTION:
                return {
                    loading: false,
                    collections: action.payload
                }

            case CollectionsENUM.DELETE_COLLECTION: 
                return {
                    ...state,
                    collections: state.collections?.filter((col: any) => col._id !== action.payload._id)
                }

            case CollectionsENUM.BIGEST_COLLECTIONS: 
            return {
                ...state,
                bigestCollections: action.payload
            }

            // case CollectionsENUM.GE


            default:
                return state
        }
}