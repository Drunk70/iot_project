import service from '@/utils/request'

export function setlogin(data) {
  return service({
    url: '/base/baseInfo/baseUserLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {}

export function logout() {}
