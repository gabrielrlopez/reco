import api from '../utils/api'
import {setAlert} from './alert'
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    GET_PROFILES
} from './types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profiles/me')
        console.log(res.data)
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

export const addBookToDB = (book) => async dispatch => {
    try {
        const res = await api.put('/profiles/me/myBooks', book)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        console.log(res.data);
        dispatch(setAlert('Book added to your base!', 'success', 3000))
    } catch (error) {
        const errors = error.response
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


