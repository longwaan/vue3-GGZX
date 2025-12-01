import request from "@/utils/request";
import type { loginFromData, loginResponseData, userInfoResponseData } from "./type";

enum API{
  LOGIN_URL ='/admin/acl/index/login',
  USERINFO='/admin/acl/index/info',

}

const reqLogin =(data:loginFromData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data)
const reqUserInfo=()=>request.get<any,userInfoResponseData>(API.USERINFO)
export{
  reqLogin,
  reqUserInfo,
}