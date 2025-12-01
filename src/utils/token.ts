//本地存储token
const SET_Token=(token:string) => {
  localStorage.setItem("TOKEN", token)
}

//获取token
const GET_Token=()=>{
   return localStorage.getItem("TOKEN")
}

const REMOVE_Token=()=>{
  return localStorage.removeItem("TOKEN")
}

export {
  SET_Token,
  GET_Token,
  REMOVE_Token,
}