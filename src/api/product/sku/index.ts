import request from "@/utils/request";
import type { SkuInfoData } from "./type";
enum API {
  GTESKU_URL = '/admin/product/list/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
  ONSALE_URL = '/admin/product/onSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  REMOVESKU_URL = '/admin/product/deleteSku/',
}

const reqSkuList = (page: number, limit: number) => request.get<any, SkuInfoData>(API.GTESKU_URL + `${page}/${limit}`)
const reqCancelSale = (skuId: number | string) => request.get<any, any>(API.CANCELSALE_URL + skuId)
const reqOnSale = (skuId: number | string) => request.get<any, any>(API.ONSALE_URL + skuId)
const reqSkuInfo = (skuId: number | string) => request.get<any, any>(API.SKUINFO_URL + skuId)
const reqRemoveSku = (skuId: number | string) => request.delete<any, any>(API.REMOVESKU_URL + skuId)

export {
  reqSkuList,
  reqCancelSale,
  reqOnSale,
  reqSkuInfo,
  reqRemoveSku,
}