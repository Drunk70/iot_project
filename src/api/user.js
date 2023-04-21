import service from '@/utils/request'

export function setlogin(data) { // 登录api
  return service({
    url: '/base/baseInfo/baseUserLogin',
    method: 'post',
    data
  })
}

export function logout(data) {
  return service({
    url: '/base/baseInfo/baseUserLogout',
    method: 'post',
    data
  })
}
