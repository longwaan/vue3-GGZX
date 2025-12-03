import request from "@/utils/request";
import type { TradeMark, TradeMarkResponseData } from "./type";
enum API {
  TRADELIST_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
}

const reqTradeList = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADELIST_URL + `${page}/${limit}`)
const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.EDITTRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export {
  reqTradeList,
  reqAddOrUpdateTradeMark,
}