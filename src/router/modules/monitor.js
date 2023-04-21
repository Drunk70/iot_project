// 运维监控路由规则
import layout from '@/layout'
export default {
  path: '/monitor',
  name: 'monitor',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/monitor'),
    meta: { title: '运维监控', icon: 'link', percode: '13' }
  }]
}
