import api from '../utils/api'
import {setAlert} from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types'

export const signUp = ({firstName, lastName, email, password, passwordConfirm}) => async dispatch => {
    try {
        const body = {firstName, lastName, email, password, passwordConfirm}
        const res = await api.post('/users/signup', body)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data
        if(errors){
            console.log(errors)
            dispatch(setAlert(errors.message, 'danger', 3000))
        }
    }
}

export const login = ({email, password}) => async dispatch => {
    console.log(email, password)
    try {
        const body = {email, password}
        const res = await api.post('/users/login', body )
        console.log(res)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data
        if(errors){
            console.log(errors)
            dispatch(setAlert(errors.message, 'danger', 3000))
        }
    }
}