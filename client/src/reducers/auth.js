import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
}
from '../actions/types'

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const {type, payload} = action
    switch (type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case LOGOUT: 
            return {
            ...state,
            isAuthenticated: false,
            loading: false,
            user: null
        }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        return {
            ...state,
            isAuthenticated: false,
            loading: false,
            user: null
        }
    
        default:
            return state
    }
}