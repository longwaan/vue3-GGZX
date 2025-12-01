import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/stores/modules/user";
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,

})
//请求拦截器
request.interceptors.request.use((config => {
  let useStore=useUserStore()
  if(useStore.token){
    config.headers.token=useStore.token
  }
  return config;
}))

//响应拦截器
request.interceptors.response.use((response) => {
  
  return response.data;
}, (error) => {
  //处理网络问题
  let message = "";
  let status = error.response.status;
  switch (status) {
        case 401:
            message = 'token失效，请重新登录';
            break;
        case 403:
            message = '权限不足，请联系管理员';
            break;
        case 404:
            message = '请求地址错误';
            break;
        case 500:
            message = '服务器错误';
            break;
        default:
            message = '网络错误';
            break;

  }
  ElMessage({
    type:'error',
    message
  })

  return Promise.reject(error);
})

export default request;
