import { defineStore } from "pinia";

let useSettingFoldStore = defineStore("SettingFoldStore", {
  state: () => {
    return {
      fold: false,
      refresh:false,
    }
  }

})

export default useSettingFoldStore;