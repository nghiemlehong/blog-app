import axiosClient from './apiClient'

export class UserAPI {
    static async login(body) {
        const url = '/user/signin'
        const result = await axiosClient.post(url, body)
        return result
    }

    static async check(headers) {
        const url = "/user/check"
        const result = await axiosClient.post(url, {}, headers)
        return result
    }

    static async signUp(body, headers) {
        const url = '/user/signup'
        const result = await axiosClient.post(url, body, headers)
        return result
    }

}

