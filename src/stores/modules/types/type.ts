import type { RouteRecordRaw } from "vue-router";

interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  //存储当前用户是否包含某一个按钮
  buttons: string[];
}

export type {
  UserState
}




