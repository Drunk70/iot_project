// 账号中心路由
import layout from '@/layout'
export default {
  path: '/account',
  name: 'account',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/account'),
    meta: { title: '账号中心', icon: 'user', percode: '02' }
  }]
}
