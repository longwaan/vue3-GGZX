import request from "@/utils/request";
import type { MenuParams, PermisstionResponseData } from "./type";
enum API {
  GETMENULIST = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  UPDATEMENU_URL = '/admin/acl/permission/update',
  REMOVEMENU_URL = '/admin/acl/permission/remove/{id}'

}

const reqGetMenuList = () => request.get<any, PermisstionResponseData>(API.GETMENULIST)
const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
const reqRemoveMenu = (menuId: number) => request.delete<any, any>(API.REMOVEMENU_URL + menuId)

export {
  reqGetMenuList,
  reqAddOrUpdateMenu,
  reqRemoveMenu,


}