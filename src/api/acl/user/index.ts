import request from "@/utils/request";
import type { AllRoleResponseData, SetRoleData, User, UserResponseData } from "./type";
enum API {
  GETUSER_URL = '/admin/acl/user/',
  ADDUSER_URL='/admin/acl/user/save',
  UPDATEUSER_URL='/admin/acl/user/update',
  TOROLE_URL='/admin/acl/user/toAssign/',
  DOROLE_URL='/admin/acl/user/doAssignRole',
  REMOVEUSER_URL='/admin/acl/user/remove/',
  DELETEUSER_URL='/admin/acl/user/batchRemove',
}

const reqGetUser = (page: number | string, limit: number | string,username:string) => request.get<any, UserResponseData>(API.GETUSER_URL + `${page}/${limit}?username=${username}`)
const reqAddOrUpdateUser=(date:User)=>{
  if(date.id){
   return request.put<any,any>(API.UPDATEUSER_URL,date)
  }else{
    return request.post<any,any>(API.ADDUSER_URL,date)
  }
}

const reqToRole=(id:number)=>request.get<any,AllRoleResponseData>(API.TOROLE_URL+id)
const reqDoRole=(data:SetRoleData)=>request.post<any,any>(API.DOROLE_URL,data)
const reqRemoveUser=(id:number)=>request.delete<any,any>(API.REMOVEUSER_URL+id)
const reqDeleteUser=(idList:number[])=>request.delete<any,any>(API.DELETEUSER_URL,{data:idList})

export {
  reqGetUser,
  reqAddOrUpdateUser,
  reqToRole,
  reqDoRole,
  reqRemoveUser,
  reqDeleteUser,

}