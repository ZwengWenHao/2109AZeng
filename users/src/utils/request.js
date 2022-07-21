import axios from "axios";
import envConfig from './env'

const reque = axios.create({

    baseURL: envConfig.perod.baseURl,
    // baseURL: 'http://www.ysqorz.top:8888/api/private/v1',
    timeout: 5000
})
// 请求拦截
reque.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
},
    (err) => {
        return Promise.reject(err)
    })
// 响应拦截
reque.interceptors.response.use((res) => {
    return res.data
},
    (err) => {
        return Promise.reject(err)
    }
)

export default reque
