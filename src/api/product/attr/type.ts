interface ResponseData{
  code:number,
  ok:boolean,
  message:string,

}

//分类ts类型
interface CategoryObj {
    id: number | string;
    name: string;
    category1Id?: number,
    category2Id?: number,
}

//相应的分类接口返回数据的类型
interface CategoryResponseData extends ResponseData {
    data: CategoryObj[];
}

//属性与属性值的ts类型
//属性值对象的ts类型
interface AttrValue{
    id?:number,
    valueName:string,
    attrId?:number,
    flag?:boolean,//控制每一个属性值编辑模式与切换模式的切换
}

//存储每一个属性值的数组类型
type AttrValueList=AttrValue[];

//属性对象
interface Attr{
    id?:number,
    attrName:string,
    categoryId:number|string,
    categoryLevel:number,
    attrValueList: AttrValueList
}

//存储每一个属性的数组类型
type AttrList=Attr[];

//属性接口返回的数据ts类型
interface AttrResponseData extends ResponseData {
    data:AttrList
}

export type{
  ResponseData,
  CategoryObj,
  CategoryResponseData,
  AttrValueList,
  Attr,
  AttrList,
  AttrResponseData,

}
