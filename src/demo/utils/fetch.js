/**.
 * @author  Administrator
 * @date   2017/11/16 16:42
 */
import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
    baseURL: "https://api-dev", // api的base_url
    timeout: 5000                  // 请求超时时间 5秒
})
// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => response,

    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service