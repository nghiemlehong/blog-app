import axios from 'axios'
import {URL_API_TEST} from '../env/API'
const axiosClient = axios.create({
    baseURL: URL_API_TEST,
    headers: {
        'content-type': 'application/json',
    }
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
})


export default axiosClient
