import request from "@/utils/request";
import type { AttrResponseData, CategoryResponseData } from "./type";

enum API{
  GETC1_URL='/admin/product/getCategory1',
  GETC2_URL='/admin/product/getCategory2/',
  GETC3_URL='/admin/product/getCategory3/',
  GETATTR_URL='/admin/product/attrInfoList/'
}

const reqC1Attr=()=>request.get<any,CategoryResponseData>(API.GETC1_URL)
const reqC2Attr=(category1Id:number|string)=>request.get<any,CategoryResponseData>(API.GETC2_URL+category1Id)
const reqC3Attr=(category2Id:number|string)=>request.get<any,CategoryResponseData>(API.GETC3_URL+category2Id)
const reqAttr=(category1Id:number|string,category2Id:number|string,category3Id:number|string)=>request.get<any,AttrResponseData>(API.GETATTR_URL+`${category1Id}/${category2Id}/${category3Id}`)

export {
  reqC1Attr,
  reqC2Attr,
  reqC3Attr,
  reqAttr,

}