import { ItemENUM, ItemTypes, IItem } from '../types/itemsType';

interface IState {
    loading: boolean,
    items: any,
    item: any,
    numberOfPages: number,
    currentPage: number
}

const initializeState: IState = {
    loading: false,
    items: [],
    item: null,

    numberOfPages: 1,
    currentPage: 1
}

export const itemReducer = (state = initializeState, action: ItemTypes) => {
        switch (action.type) {
            case ItemENUM.GET_ITEMS:
                return {
                    loading: false,
                    items: action.payload
                }
            
            case ItemENUM.LOADING: 
            return {
                ...state,
                loading: true
            }

            case ItemENUM.CREATE_ITEM: 
            return {
                ...state.items, items: [...state.items, action.payload]
            }

            case ItemENUM.GET_ONE_ITEM: 
            return {
                loading: false,
                item: action.payload
            }

            case ItemENUM.LIKE_ITEM: 
            return {
                ...state,
                items: state.items.map((i: IItem) => i._id === action.payload._id ? action.payload : i),
            } 


            case ItemENUM.LIKE_ITEM_PAGE: 
            return {
                item: action.payload
            }

            case ItemENUM.COMMENT_ITEM: 
            return {
                ...state
            }

            case ItemENUM.DELETE_ITEM: 
            return {
                ...state, 
                items: state.items.filter((item: any) => item._id !== action.payload._id)
            }

            case ItemENUM.UPDATE_ITEM:
                return {
                ...state,
                items: state.items.map((i: IItem) => i._id === action.payload._id ? action.payload : i),
                }

            case ItemENUM.SEARCH_ITEMS: 
            return {
                ...state,
                loading: false,
                items: action.payload.items,
        
                numberOfPages: action.payload.numberOfPages, 
                currentPage: action.payload.currentPage

            }

            case ItemENUM.GET_LAST_ITEMS:
                return {
                    ...state,
                    loading: false,
                    items: action.payload.items,
                    numberOfPages: action.payload.numberOfPages, 
                }

            case ItemENUM.GET_LAST_ITEMS_LOAD_MORE:
                return {
                    ...state, 
                    loading: false,
                    items: [...state.items, ...action.payload.items],
        
                    numberOfPages: action.payload.numberOfPages, 
                    currentPage: action.payload.currentPage
                }
            default:
                return state
        }
}