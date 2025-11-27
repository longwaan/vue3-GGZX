interface loginFromData{
  username:string,
  password:string,
}

interface ResponseData{
  code:number,
  message:string,
  ok:boolean,
}

interface loginResponseData extends ResponseData{
  data:string
}

interface userInfoResponseData extends ResponseData{
  data:{
    avatar:string,
    button:string[],
    name:string,
    roles:string[],
    routes:string[],
  }
}



export type{
  loginFromData,
  ResponseData,
  loginResponseData,
  userInfoResponseData,
}