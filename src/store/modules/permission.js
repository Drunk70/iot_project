// vuex的权限管理模块
// 引入静态路由表
import { constantRoutes, asyncRoutes } from '@/router'
import store from '@/store'
// 判断动态路由和菜单匹配项
function getRoutes(routes) {
  const res = []
  // 循环动态路由表
  routes.forEach(route => {
    const tmp = { ...route }
    // 调用方法判断当前路由是否需要添加到路由表
    if (compare(tmp)) {
      // 有children的话递归
      if (tmp.children) {
        tmp.children = getRoutes(tmp.children)
      }
      // 添加进路由表
      res.push(tmp)
    }
  })
  return res
}
function compare(route) {
  const menu = store.getters.menuPermCodes
  if (route.hidden) {
    return true
  }
  if (route.meta && route.meta.permCode) {
    return menu.some(PermCode => route.meta.permCode === PermCode)
  } else {
    return true
  }
}
const state = {
  routes: constantRoutes, // 所有人默认有静态路由
  addroute: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    // newRoutes是登录后通过权限得到的动态路由部分
    state.routes = [...state.addroute, ...newRoutes]
  }
}

const actions = {
  // 筛选权限路由
  filterRoutes(context) {
    return new Promise(resolve => {
    // 获取符合权限的路由
      const res = getRoutes(asyncRoutes)
      // 调用方法添加进路由表
      context.commit('setRoutes', res)
      resolve(res)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
