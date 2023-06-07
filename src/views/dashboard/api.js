import service from '@/utils/request'
export function iotDashboardInfoGet() { // 登录api
  return service({
    url: `/dashboard/dashboardInfo/iotDashboardInfoGet`,
    method: 'post'
  })
}
export function iotDashboardOnlineDeviceList(data) {
  return service({
    url: `/dashboard/dashboardInfo/iotDashboardOnlineDeviceList`,
    method: 'post',
    data
  })
}
