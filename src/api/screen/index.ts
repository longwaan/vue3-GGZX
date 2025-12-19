// 数据大屏模块API管理
import request from "@/utils/request";
import type {
  RankResponseData,
  AgeResponseData,
  YearResponseData,
  LineResponseData,
  CouterResponseData,
  ScatterResponseData,
  SexResponseData,
  TouristResponseData,
  MapResponseData
} from "./type";

// 数据大屏API地址枚举
enum API {
  // 获取热门景区排行榜数据
  RANK_URL = '/screen/rank',
  // 获取年龄比例数据
  AGE_URL = '/screen/age',
  // 获取年度游客量数据
  YEAR_URL = '/screen/year',
  // 获取未来七天游客趋势数据
  LINE_URL = '/screen/line',
  // 获取重点区域数据
  COUTER_URL = '/screen/couter',
  // 获取散点图数据
  SCATTER_URL = '/screen/scatter',
  // 获取性别比例数据
  SEX_URL = '/screen/sex',
  // 获取实时游客统计数据
  TOURIST_URL = '/screen/tourist',
  // 获取地图数据
  MAP_URL = '/screen/map'
}

// 获取热门景区排行榜数据
export const reqRankData = () => request.get<any, RankResponseData>(API.RANK_URL);

// 获取年龄比例数据
export const reqAgeData = () => request.get<any, AgeResponseData>(API.AGE_URL);

// 获取年度游客量数据
export const reqYearData = () => request.get<any, YearResponseData>(API.YEAR_URL);

// 获取未来七天游客趋势数据
export const reqLineData = () => request.get<any, LineResponseData>(API.LINE_URL);

// 获取重点区域数据
export const reqCouterData = () => request.get<any, CouterResponseData>(API.COUTER_URL);

// 获取散点图数据
export const reqScatterData = () => request.get<any, ScatterResponseData>(API.SCATTER_URL);

// 获取性别比例数据
export const reqSexData = () => request.get<any, SexResponseData>(API.SEX_URL);

// 获取实时游客统计数据
export const reqTouristData = () => request.get<any, TouristResponseData>(API.TOURIST_URL);

// 获取地图数据
export const reqMapData = () => request.get<any, MapResponseData>(API.MAP_URL);