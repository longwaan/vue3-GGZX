// 数据大屏API返回数据类型定义

// 基础响应数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 排行榜数据类型
export interface RankData {
  categories: string[];
  barData: number[];
  lineData: number[];
}

// 排行榜响应数据类型
export interface RankResponseData extends ResponseData {
  data: RankData;
}

// 年龄比例数据项类型
export interface AgeItem {
  value: number;
  name: string;
}

// 年龄比例响应数据类型
export interface AgeResponseData extends ResponseData {
  data: AgeItem[];
}

// 年度游客量响应数据类型
export interface YearResponseData extends ResponseData {
  data: number[];
}

// 未来七天游客趋势数据类型
export interface LineData {
  categories: string[];
  data: number[];
}

// 未来七天游客趋势响应数据类型
export interface LineResponseData extends ResponseData {
  data: LineData;
}

// 重点区域数据类型
export interface CouterData {
  months: string[]; // 修改为小写months字段
  valueList: number[];
  valueList2: number[];
}

// 重点区域响应数据类型
export interface CouterResponseData extends ResponseData {
  data: CouterData;
}

// 散点图响应数据类型
export interface ScatterResponseData extends ResponseData {
  data: number[];
}

// 性别比例数据类型
export interface SexData {
  male: number;
  female: number;
}

// 性别比例响应数据类型
export interface SexResponseData extends ResponseData {
  data: SexData;
}

// 实时游客统计数据类型
export interface TouristData {
  current: number;
  total: number;
  data: number[];
}

// 实时游客统计响应数据类型
export interface TouristResponseData extends ResponseData {
  data: TouristData;
}

// 地图飞行线路数据类型
export interface MapLineData {
  coords: [number, number][]; // 起点和终点坐标
  value?: number; // 可选的值
  name?: string; // 可选的名称
}

// 地图数据类型
export interface MapData {
  lines: MapLineData[];
  points?: {
    name: string;
    value: [number, number, number]; // 经度, 纬度, 值
  }[];
}

// 地图响应数据类型
export interface MapResponseData extends ResponseData {
  data: MapData;
}