import { PostAPI } from '../../api/postAPI'
import { getToken } from '../../utils/Common'

export const getAllPost = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_POSTS' })
            const data = await PostAPI.getAllPost()
            dispatch({ type: 'FETCH_POSTS_SUCCESS', posts: data.posts })
        } catch (error) {
            dispatch({ type: 'FETCH_POSTS_FAILED' })
        }
    }
}

export const pagination = (page) => {
    if (page === 1)
        return async dispatch => {
            try {
                dispatch({ type: 'FETCH_POSTS' })
                const data = await PostAPI.pagination(page)
                dispatch({ type: 'FETCH_MORE_POSTS_SUCCESS', posts: data.posts })
            } catch (error) {
                dispatch({ type: 'FETCH_POSTS_FAILED' })
            }
        }
    else return async dispatch => {
        try {
            const data = await PostAPI.pagination(page)
            dispatch({ type: 'FETCH_MORE_POSTS_SUCCESS', posts: data.posts })
        } catch (error) {
            dispatch({ type: 'FETCH_POSTS_FAILED' })
        }
    }
}

export const getPostByIdUser = () => {
    return async dispatch => {
        try {
            const headers = { headers: { token: getToken() } }
            dispatch({ type: 'FETCH_POSTS' })
            const data = await PostAPI.getPostByIdUser(headers)
            dispatch({ type: 'FETCH_POSTS_SUCCESS', posts: data.posts })
        } catch (error) {
            dispatch({ type: 'FETCH_POSTS_FAILED' })

        }
    }
}

export const getFavoritesList = (page) => {
    const headers = { headers: { token: getToken() } }

    if (page === 1)
        return async dispatch => {
            try {

                dispatch({ type: 'FETCH_POSTS' })
                const data = await PostAPI.favoritesList(headers,page)
                dispatch({ type: 'FETCH_MORE_POSTS_SUCCESS', posts: data.posts })
            } catch (error) {
                dispatch({ type: 'FETCH_POSTS_FAILED' })
            }
        }
    else return async dispatch => {
        try {
            const data = await PostAPI.favoritesList(headers,page)
            dispatch({ type: 'FETCH_MORE_POSTS_SUCCESS', posts: data.posts })
        } catch (error) {
            dispatch({ type: 'FETCH_POSTS_FAILED' })
        }
    }
}