import request from "@/utils/request";
enum API {
  TRADELIST_URL = '/admin/product/baseTrademark/'
}

const reqTradeList = (page: number, limit: number) => request.get<any, any>(API.TRADELIST_URL + `${page}/${limit}`)

export {
  reqTradeList,
}