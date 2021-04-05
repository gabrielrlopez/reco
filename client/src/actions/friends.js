import api from '../utils/api'
import { 
    SEARCHED_FRIENDS,
    UPDATE_PROFILE,
    PROFILE_ERROR 
} from "./types"

//Fires off useEffect in Users.js component. (Rendering new search results when performing a friend search when client is on User.js component.)
export const searchFriends = (boolean) => async dispatch => {
    dispatch({
        type: SEARCHED_FRIENDS,
        payload: boolean
    })
}


export const deleteFriend = (friendUserId) => async dispatch => {
    try {
        const profile = {
            friendUserId
        }
        const res = await api.post('/profiles/friends/delete', profile)
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

