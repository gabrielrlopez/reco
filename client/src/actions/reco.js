import api from '../utils/api'
import {setAlert} from './alert'
import {
    UPDATE_PROFILE,
    PROFILE_ERROR,
} from './types'


export const sendNewReco = (userId, book) => async dispatch => {
    const data = {
        userId,
        book
    }
    try {
        const res = await api.post('/recos/sendReco', data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Sent book recommendation!', 'success', 3000))
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

export const deleteReco = (recoId) => async dispatch => {
    const data = {
        recoId
    }
    try {
        const res = await api.put('/recos/deleteReco', data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Reco deleted', 'success', 3000))
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

export const markRecoAsSeen = (recoId) => async dispatch => {
    const data = {
        recoId
    }
    try {
        const res = await api.put('/recos/markAsSeen', data)
        dispatch({
            type: UPDATE_PROFILE,
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


