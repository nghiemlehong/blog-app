import axiosClient from './apiClient'

export class UserAPI {
    static login(body) {
        const url = '/user/signin'
        const result = axiosClient.post(url, body)
        return result
    }

    static check(headers) {
        const url = "/user/check"
        const result = axiosClient.post(url, {}, headers)
        return result
    }

    static signUp(body, headers) {
        const url = '/user/signup'
        const result = axiosClient.post(url, body, headers)
        return result
    }
    static updateUser(body, headers) {
        const url = `/user/`
        const result = axiosClient.put(url, body, headers)
        return result
    }
    static updateAvatar(body, headers){
        const url =`/user/updateAvatar`
        const result = axiosClient.post(url, body, headers)
        return result   
    }

    static updatePassword(body, headers) {
        const url =`/user/updatePass`
        const result = axiosClient.post(url, body, headers)
        return result  
    }

}

