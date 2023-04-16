import Cookies from 'js-cookie'

const TokenKey = 'iTo_token'

export function CookieGetToken() {
  return Cookies.get(TokenKey)
}

export function CookieSetToken(token) {
  return Cookies.set(TokenKey, token)
}

export function CookieRemoveToken() {
  return Cookies.remove(TokenKey)
}
