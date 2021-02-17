import axiosClient from './apiClient'

export class CommentAPI {  
    static async createComment(headers, body){
        const url = '/comment'
        const result = axiosClient.post(url,body,headers)
        return result
    }
   static async updateComment (headers, body,params) {
       const url = `/comment/${params}`
       const result = axiosClient.put(url,body,headers)
       return result
   } 
   static async deleteComment (headers, params){
       const url = `/comment/${params}`
       const result = axiosClient.delete(url,headers)
       return result
   }

}