import api from '../utils/api'
import {setAlert} from './alert'
import {
    UPDATE_PROFILE,
    PROFILE_ERROR,
} from './types'


export const sendFriendRequest = (receiverUserId, receiverUserName, receiverFullName) => async dispatch => {
    try {
        const profile = {
            receiverUserId
        }
        const res = await api.post('/profiles/requests', profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res
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

export const cancelFriendRequest = () => async dispatch => {
    try {

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

export const acceptFriendRequest = (senderId) => async dispatch => {
    try {
        const profile = {
            senderId
        }
        const res = api.post('/profiles/requests/decline', profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res
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

export const declineFriendRequest = (senderId) => async dispatch => {
    try {
        const profile = {
            senderId
        }
        const res = api.post('/profiles/requests/decline', profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res
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