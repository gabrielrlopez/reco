import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
}
from '../actions/types'

const initialState = {
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const {type, payload} = action
    switch (type) {
        case REGISTER_SUCCESS:
            
        case REGISTER_FAIL:

        case LOGIN_SUCCESS:
            return {
                user: {...payload}
            }
        case LOGIN_FAIL:
    
        default:
            return state
    }
}