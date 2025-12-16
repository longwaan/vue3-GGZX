import request from "@/utils/request";
import type { MenuResponseData, RoleData, RoleResponseData } from "./type";
enum API {
  GETROLE = '/admin/acl/role/',
  ADDROLE = '/admin/acl/role/save',
  UPDATEROLE = '/admin/acl/role/update',
  //获取全部的菜单与按钮的数据
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  //给相应的职位分配权限
  SETPERMISSION_URL = '/admin/acl/permission/doAssign?',

}

const reqGetRole = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.GETROLE + `${page}/${limit}?roleName=${roleName}`)
const reqAddOrUpdateRole = (role: RoleData) => {
  if (role.id) {
    return request.put<any, any>(API.UPDATEROLE, role)
  } else {
    return request.post<any, any>(API.ADDROLE, role)
  }
}
//获取角色全部权限
const reqGetAllPermission = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
//分配权限
const reqSetPermission = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)



export {
  reqGetRole,
  reqAddOrUpdateRole,
  reqGetAllPermission,
  reqSetPermission,
}

