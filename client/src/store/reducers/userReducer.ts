import { UserActionTypes, UserENUM, IUser } from '../types/userTypes';


const initializeState = {
    user: [],
    error: '',
    currentUserName: '',
    users: [],
    loading: false,

    numberOfPages: 1,
    currentPage: 1
}

export const userReducer = (state = initializeState, action: UserActionTypes) => {
    switch (action.type) {
        case UserENUM.AUTH:
         localStorage.setItem('profile', JSON.stringify(action.payload))
         return {
             user: action.payload,
             error: ''
         }

         case UserENUM.LOGOUT: 
         localStorage.removeItem('profile')
         return {
             user: []
         }

         case UserENUM.LOGIN_ERROR: 
         return {
             error: action.payload
         }

         case UserENUM.GET_ONE_USER: 
         return {
             ...state,
            currentUserName: action.payload
         }


         case UserENUM.GET_USERS: 
         return {
             users: action.payload.users,
             numberOfPages: action.payload.numberOfPages, 
            currentPage: action.payload.currentPage

         }

         case UserENUM.CHANGE_STATUS: 
         return {
            ...state,
            users: state.users.map((user: IUser) => user._id === action.payload?._id ? action.payload : user)
         }

         case UserENUM.DELETE_USER:
             return {
                 ...state,
                 users: state.users.filter((user: IUser) => user._id !== action.payload._id)
             }

         case UserENUM.USER_HAS_BEEN_BLOCKED: 
         return {
            error: action.payload
         }

        default:
            return state
    }
}