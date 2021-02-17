import { PostAPI } from '../../api/postAPI'

export const getAllPost =  () => {
    return async (dispatch) => {
        try {
            dispatch({type : 'FETCH_POSTS'})
            const data = await PostAPI.getAllPost()
            dispatch({type : 'FETCH_POSTS_SUCCESS', posts :  data.posts})
        } catch (error) {
            dispatch({type : 'FETCH_POSTS_FAILED'})
        }
    }
}