import axiosClient from './apiClient'

export class PostAPI {
    static createPost(headers, body) {
        const url = '/post'
        const result = axiosClient.post(url, body, headers)
        return result
    }
    static getAllPost() {
        const url = '/post'
        const result = axiosClient.get(url)
        return result
    }
    static likePost(headers, params) {
        const url = `/post/like/${params}`
        const result = axiosClient.post(url, {}, headers)
        return result
    }
    static dislikePost(headers, params) {
        const url = `/post/dislike/${params}`
        const result = axiosClient.post(url, {}, headers)
        return result
    }
    static getOnePost(params) {
        const url = `/post/${params}`
        const result = axiosClient.get(url)
        return result
    }
    static deletePost(headers, params) {
        const url = `/post/${params}`
        const result = axiosClient.delete(url, headers)
        return result
    }
    static updatePost(headers, params, body) {
        const url = `/post/${params}`
        const result = axiosClient.put(url, body, headers)
        return result
    }
    static pagination(params) {
        const url = `/post/page/${params}`
        const result = axiosClient.get(url)
        return result
    }
    static getPostByIdUser(headers) {
        const url = `/post`
        const result = axiosClient.patch(url, {}, headers)
        return result
    }
    static favoritesList(headers, params) {
        const url = `/post/favorites/${params}`
        const result = axiosClient.post(url, {}, headers)
        return result
    }
    static getNewPost(params) {
        const url =`/post/newPost/${params}`
        const result = axiosClient.get(url)
        return result
    }

}