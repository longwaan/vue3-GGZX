interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

interface TradeMark {
  id?: number,
  logoUrl: string,
  tmName: string,
}

type Record = TradeMark[]

interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Record,
    total: number,
    size: number,
    current:number,
    searchCount: boolean,
    pages: number
  }

}

export type{
  ResponseData,
  TradeMark,
  Record,
  TradeMarkResponseData,
}
