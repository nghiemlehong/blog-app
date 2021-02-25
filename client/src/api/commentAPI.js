import axiosClient from './apiClient'

export class CommentAPI {
    static createComment(headers, body) {
        const url = '/comment'
        const result = axiosClient.post(url, body, headers)
        return result
    }
    static updateComment(headers, body, params) {
        const url = `/comment/${params}`
        const result = axiosClient.put(url, body, headers)
        return result
    }
    static deleteComment(headers, params) {
        const url = `/comment/${params}`
        const result = axiosClient.delete(url, headers)
        return result
    }
    static getComment(params){
        const url = `/comment/${params}`
        const result = axiosClient.get(url)
        return result
    }

}