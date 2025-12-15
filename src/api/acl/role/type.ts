 interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}
//职位数据类型
 interface RoleData {
    id?: number;
    createTime?: string;
    updateTime?: string;
    roleName: string;
    remark?: string;
}

//全部职位的数组的ts类型
 type Records = RoleData[];
//全部职位数据的相应的ts类型
 interface RoleResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number,
        searchCount: boolean,
    }
}

//菜单与按钮数据的ts类型
 interface MenuData{
  id:number,
  createTime:string,
  updateTime:string,
  pid:number,
  name:string,
  code:string,
  toCode:string,
  type:number,
  status:null,
  level:number,
  children:MenuList,
  select:boolean,
}

 type MenuList = MenuData[];

//菜单权限与按钮权限数据的ts类型
 interface MenuResponseData extends ResponseData {
    data: MenuList
}


export type{
  ResponseData,
  RoleData,
  Records,
  RoleResponseData,
  MenuData,
  MenuList,
  MenuResponseData,
}





