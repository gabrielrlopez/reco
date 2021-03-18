import api from '../utils/api'
import {setAlert} from './alert'
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    GET_SEARCHED_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
} from './types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profiles/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: error
        })
    }
}

export const getSearchedProfile = (searchInput) => async dispatch => {
    try {
        const query = {
            userName: searchInput
        }
        const res = await api.post('profiles/search', query)
        dispatch({
            type: GET_SEARCHED_PROFILE,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data
        if(errors){
            console.log(errors)
            dispatch(setAlert(errors.message, 'danger', 3000))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: error
        })
    }
}

export const createUpdateProfile = () => async dispatch => {
    try {
        const res = await api.post('/profiles/me')
        dispatch({
            type: UPDATE_PROFILE,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: error
        })
    }
}




