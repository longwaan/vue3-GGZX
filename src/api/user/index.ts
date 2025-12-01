import request from "@/utils/request";
import type { loginFromData, loginResponseData, userInfoResponseData } from "./type";

enum API{
  LOGIN_URL ='/admin/acl/index/login',
  USERINFO='/admin/acl/index/info',
  LOGOUT_API='/admin/acl/index/logout',
}

const reqLogin =(data:loginFromData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data)

const reqUserInfo=()=>request.get<any,userInfoResponseData>(API.USERINFO)

const reqLogout=()=>request.post<any,any>(API.LOGOUT_API)
export{
  reqLogin,
  reqUserInfo,
  reqLogout,
}