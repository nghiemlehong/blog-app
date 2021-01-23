import axiosClient from './apiClient'

export class TagAPI{
    static async getAllTag(){
        const url = '/tag'
        const result = axiosClient.get(url)
        return result
    }
}