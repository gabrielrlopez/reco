import api from '../utils/api'
import {setAlert} from './alert'
import {
    UPDATE_PROFILE,
    PROFILE_ERROR,
} from './types'


export const sendFriendRequest = (receiverUserId, receiverFullName) => async dispatch => {
    try {
        const profile = {
            receiverUserId
        }
        const res = await api.post('/profiles/requests', profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res
        })
        dispatch(setAlert(`Friend request sent to ${receiverFullName}`, 'success', 3000))
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

export const cancelFriendRequest = (requestedUserId) => async dispatch => {
    try {
        const profile = {
            requestedUserId
        }
        const res = await api.post('/profiles/requests/cancel', profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res
        })
        dispatch(setAlert(`Friend request canceled.`, 'warning', 3000))
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

export const acceptFriendRequest = (senderUserId) => async dispatch => {
    try {
        const profile = {
            senderUserId
        }
        const res = api.post('/profiles/requests/accept', profile)
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

export const declineFriendRequest = (senderUserId, senderUserName, senderUserFullName) => async dispatch => {
    try {
        const profile = {
            senderUserId,
            senderUserName,
            senderUserFullName
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