import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'
import { usePluginStateStore } from '../store/user'
const router = useRouter()

const baseURL = 'http://127.0.0.1:3007'
// 创建axios实例
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器,获取token
request.interceptors.request.use(
  (config) => {
    config.headers['Content-type'] = 'application/x-www-form-urlencoded'
    // const userStore = Store()
    const userStore = usePluginStateStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截器,拦截错误信息
request.interceptors.response.use(
  (res) => {
    if (res.data.status === 401) {
      router.push({ name: 'login' })
    }

    return res
  },
  (err) => {
    MessagePlugin.warning({ content: '服务异常' })
    // const userStore = usePluginStateStore()
    // err.response?.status === 401 ||
    // if (userStore.token === '') {
    //   router.push({name: 'login'})
    // }
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
