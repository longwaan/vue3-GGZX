import request from "@/utils/request";
import type { AllTradeMark, HasSaleAttrResponseData, HasSpuResponseData, SaleAllResponseData, SkuData, SpuData, SpuHasImg } from "./type";

enum API {
  GETSPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  //获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性【颜色、版本、属性】
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  
  ADDSKU_URL='/admin/product/saveSkuInfo',

  SKUINFO_URL='/admin/product/findBySpuId/',
}
const reqSpu = (page: number, limit: number, category3Id: string | number) => request.get<any, HasSpuResponseData>(API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
const reqTradeMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
//获取某个SPU下的全部的售卖商品的图片数据
const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
//获取某一个已有的SPU拥有多少个销售属性
const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAllResponseData>(API.SPUHASSALEATTR_URL + spuId)

//获取全部的销售属性
const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

//更新/新增spu
const reqAddOrUpdateSpu=(data:SpuData)=>{
  if(data.id){
   return request.post<any,any>(API.UPDATESPU_URL,data)
  }else{
   return request.post<any,any>(API.ADDSPU_URL,data)
  }
}
//新增SKU
const reqAddSku=(data:SkuData)=>request.post<any,any>(API.ADDSKU_URL,data)

//查询sku
const reqSkuList=(spuId:number | string)=>request.get<any,any>(API.SKUINFO_URL+spuId)


export {
  reqSpu,
  reqTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
  reqAddSku,
  reqSkuList,

}