// 规则引擎路由规则
import layout from '@/layout'
export default {
  path: '/rule',
  name: 'rule',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/rule'),
    meta: { title: '规则引擎', icon: 'tree', percode: '12' }
  }]
}
