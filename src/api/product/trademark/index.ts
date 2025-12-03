import request from "@/utils/request";
import type { TradeMark, TradeMarkResponseData } from "./type";
enum API {
  TRADELIST_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_URL='/admin/product/baseTrademark/remove/'
}

const reqTradeList = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADELIST_URL + `${page}/${limit}`)
const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.EDITTRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

const reqDeleteTradeMark=(id:number)=>request.delete<any,any>(API.DELETETRADEMARK_URL+`${id}`)

export {
  reqTradeList,
  reqAddOrUpdateTradeMark,
  reqDeleteTradeMark,
}