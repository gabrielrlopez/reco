import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    GET_SEARCHED_PROFILE,
    SEARCHED_FRIENDS
} from '../actions/types'

const initialState = {
    profile: null,
    searchedProfile: null,
    profiles: [],
    loading: true,
    searchedFriends: false,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action 

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_SEARCHED_PROFILE:
            return {
                searchedProfile: payload,
                loading: false
            }
        case SEARCHED_FRIENDS: 
            return {
                searchedFriends: payload
            }
        case GET_PROFILES:
            return {
                ...state,
                profile: payload,
                loading: false
        }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: 
            return state
    }
}