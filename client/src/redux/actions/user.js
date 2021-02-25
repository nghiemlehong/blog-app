import { UserAPI } from '../../api/userAPI'
import { getToken } from '../../utils/Common'
import {removeToken} from '../../utils/Common'
export const getUser = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'FETCH_USER' })
            const headers = { headers: { token: getToken() } }
            const user = await UserAPI.check(headers)
            dispatch({ type: 'FETCH_USER_SUCCESS', user: user.user })

        } catch (error) {
            dispatch({ type: 'FETCH_USER_FAILED', message: error.response.data.message })
            removeToken()
        }

    }
}

export const removeUser = () =>{
    return {type : 'FETCH_USER'}
}