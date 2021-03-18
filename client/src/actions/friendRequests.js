import api from '../utils/api'
import {setAlert} from './alert'
import {
    UPDATE_PROFILE,
    PROFILE_ERROR,
} from './types'


export const sendFriendRequest = (receiverId) => async dispatch => {
    try {
        console.log(receiverId)
        // const res = await api.post('/', receiverId)
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