// 设备管理路由引擎
import layout from '@/layout'
export default {
  path: '/device',
  name: 'device',
  component: layout,
  alwaysShow: true,
  // redirect: '/device/info',
  meta: { title: '设备管理', icon: 'table', percode: '11' },
  children: [
    {
      path: 'info',
      name: 'info',
      component: () => import('@/views/device'),
      meta: { title: '产品', percode: '1101' }
    }
  ]
}
