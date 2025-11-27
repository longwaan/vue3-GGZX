import { reqLogin } from "@/api/user";
import type { loginFromData, loginResponseData } from "@/api/user/type";
import { defineStore } from "pinia";
import type { UserState } from "./types/type";
import { SET_Token,GET_Token } from "@/utils/token";

let useUserStore = defineStore("user", {
  //数据存储
  state: (): UserState=> {
    return {
      token:GET_Token(),
      
    }
  },
  actions: {
    async userLogin(data: loginFromData) {
      let result:loginResponseData = await reqLogin(data);
      // console.log(result)
      if (result.code === 200) {
          this.token=result.data
          // localStorage.setItem("TOKEN",(result.data))
          //本地存储持久化存储
          SET_Token(result.data as string)
          return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  // 计算属性
  getters: {

  }


})

export default useUserStore;