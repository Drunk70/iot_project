// 系统设置
import layout from '@/layout'
export default {
  path: '/system',
  name: 'system',
  component: layout,
  alwaysShow: true,
  meta: { title: '系统设置', percode: '01', icon: 'eye-open' },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/userinfo.vue'),
      meta: { title: '用户信息', percode: '0101' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role.vue'),
      meta: { title: '角色信息', percode: '0102' }
    }
  ]
}
