import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { msg, result } = response.data
    console.log('request', response.data)
    if (result === 0) {
      Message.error(msg)
      return Promise.reject(new Error(msg))
    } else {
      return Promise.resolve(response.data)
    }
  },
  (error) => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误，进入catch
  }
)

export default service
