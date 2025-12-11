import request from "@/utils/request";
import type { SkuInfoData } from "./type";
enum API {
  GTESKU_URL = '/admin/product/list/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
  ONSALE_URL = '/admin/product/onSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
}

const reqSkuList = (page: number, limit: number) => request.get<any, SkuInfoData>(API.GTESKU_URL + `${page}/${limit}`)
const reqCancelSale = (spuId: number | string) => request.get<any, any>(API.CANCELSALE_URL + spuId)
const reqOnSale = (spuId: number | string) => request.get<any, any>(API.ONSALE_URL + spuId)
const reqSkuInfo = (spuId: number | string) => request.get<any, any>(API.SKUINFO_URL + spuId)

export {
  reqSkuList,
  reqCancelSale,
  reqOnSale,
  reqSkuInfo,
}