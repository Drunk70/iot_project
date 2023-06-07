import Cookies from 'js-cookie'

const TokenKey = 'iTo_token'
const timeKey = 'iTo-timestamp-key'
export function CookieGetToken() {
  return Cookies.get(TokenKey)
}

export function CookieSetToken(token) {
  return Cookies.set(TokenKey, token)
}

export function CookieRemoveToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
