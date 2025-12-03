import type { CategoryObj } from "@/api/product/attr/type";
import type { RouteRecordRaw } from "vue-router";

interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  //存储当前用户是否包含某一个按钮
  buttons: string[];
}

//定义分类仓库state对象的ts类型
interface CategoryState {
    c1Id: string | number;
    c1Arr: CategoryObj[];
    c2Id: string | number;
    c2Arr: CategoryObj[];
    c3Id: string | number;
    c3Arr: CategoryObj[];
    

}

export type {
  UserState,
  CategoryState,
}




