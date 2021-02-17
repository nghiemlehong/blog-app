import axiosClient from './apiClient'

export class PostAPI {
    static async createPost(headers, body) {
        const url = '/post'
        const result = axiosClient.post(url, body, headers)
        return result
    }
    static async getAllPost() {
        const url = '/post'
        const result = axiosClient.get(url)
        return result
    }
    static async likePost(headers, params) {
        const url = `/post/like/${params}`
        const result = axiosClient.post(url, {}, headers)
        return result
    }
    static async dislikePost(headers, params) {
        const url = `/post/dislike/${params}`
        const result = axiosClient.post(url, {}, headers)
        return result
    }
    static async getOnePost(params) {
        const url = `/post/${params}`
        const result = axiosClient.get(url)
        return result
    }
    static async deletePost(headers, params) {
        const url = `/post/${params}`
        const result = axiosClient.delete(url, headers)
        return result
    }
    static async updatePost(headers, params, body) {
        const url = `/post/${params}`
        const result = axiosClient.put(url, body, headers)
        return result
    }

}