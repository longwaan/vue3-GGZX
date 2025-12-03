import { reqC1Attr, reqC2Attr, reqC3Attr } from "@/api/product/attr";
import { defineStore } from "pinia";
import type { CategoryState } from "./types/type";
import type { CategoryResponseData } from "@/api/product/attr/type";


const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: ''
    }
  },
  actions: {
    async getC1() {
      let result:CategoryResponseData = await reqC1Attr()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },

    async getC2() {
      let result:CategoryResponseData = await reqC2Attr(this.c1Id)
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    async getC3() {
      let result:CategoryResponseData = await reqC3Attr(this.c2Id)
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    },




  },
  getters: {

  }
})

export default useCategoryStore;