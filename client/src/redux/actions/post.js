import { PostAPI } from '../../api/postAPI'

export const getAllPost =  () => {
    return async (dispatch) => {
        try {
            const data = await PostAPI.getAllPost()
            dispatch({type : 'GET_ALL', posts :  data.posts})
        } catch (error) {
            console.log(error)
        }
    }
}