import request from "@/utils/request";
import type { loginFromData, loginResponseData } from "./type";

enum API{
  LOGIN_URL ='/admin/acl/index/login'


}

const reqLogin =(data:loginFromData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data)

export{
  reqLogin,
}