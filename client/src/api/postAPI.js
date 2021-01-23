import axiosClient from './apiClient'

export class PostAPI {
    static async createPost(headers, body) {
        const url = '/post'
        const result = axiosClient.post(url, body, headers)
        return result
    }
    static async getAllPost(){
        const url = '/post'
        const result = axiosClient.get(url)
        return result
    }
}