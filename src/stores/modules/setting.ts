import { defineStore } from "pinia";

let useSettingFoldStore = defineStore("SettingFoldStore", {
  state: () => {
    return {
      fold: false,
    }
  }

})

export default useSettingFoldStore;