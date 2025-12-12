//账号信息的ts类型
interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}
//一个账号信息的ts类型
interface User {
    id?: number
    createTime?: string
    updateTime?: string
    username: string
    password: string
    name: string
    roleName?: string
    phone?: string
}
//数组包含全部的用户信息
type Records = User[];
//获取全部用户信息接口返回的数据ts类型
interface UserResponseData extends ResponseData {
    data: {
        records: Records;
        total: number;
        size: number;
        current: number;
        pages: number;

    }

}

//代表一个职位的ts类型
interface RoleData {
    id?: number;
    createDate?: string;
    updateDate?: string;
    roleName: string;
    remark: null;
}

//全部职位的列表
type AllRole = RoleData[];

//获取全部职位接口返回的数据ts类型
interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: AllRole;
        allRolesList: AllRole;
    }
}


//给用户分配职位接口携带参数的ts类型
interface SetRoleData {
    userId: number;
    roleIdList: number[];
}

export type{
  ResponseData,
  User,
  Records,
  UserResponseData,
  RoleData,
  AllRoleResponseData,
  SetRoleData,
}

