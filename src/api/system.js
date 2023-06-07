import service from '@/utils/request'

// 获取用户列表信息
export function systemUserListGet(data) {
  return service({
    url: '/system/entUserInfo/systemUserListGet',
    method: 'post',
    data
  })
}

export function systemRoleListInfoGet(data) {
  return service({
    url: '/system/systemRoleInfo/systemRoleListInfoGet',
    method: 'post',
    data
  })
}
export function systemRoleDelete(data) {
  return service({
    url: '/system/systemRoleInfo/systemRoleDelete',
    method: 'post',
    data
  })
}
export function systemRoleMenuListGet() {
  return service({
    url: '/system/systemRoleInfo/systemRoleMenuListGet',
    method: 'post'
  })
}
