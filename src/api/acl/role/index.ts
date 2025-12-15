import request from "@/utils/request";
import type { RoleData, RoleResponseData } from "./type";
enum API {
  GETROLE = '/admin/acl/role/',
  ADDROLE = '/admin/acl/role/save',
  UPDATEROLE = '/admin/acl/role/update',


}

const reqGetRole = (page: number, limit: number, roleName: string) => request.get<any,RoleResponseData>(API.GETROLE + `${page}/${limit}?roleName=${roleName}`)
const reqAddOrUpdateRole = (role: RoleData) => {
  if (role.id) {
   return request.put<any,any>(API.UPDATEROLE,role)
  } else {
   return request.post<any,any>(API.ADDROLE,role)
  }
}

export {
  reqGetRole,
  reqAddOrUpdateRole,
}

