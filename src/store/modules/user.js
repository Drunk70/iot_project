// 引入存储cookie方法，实现持久化
import { CookieGetToken, CookieSetToken, CookieRemoveToken, setTimeStamp } from '@/utils/auth'
// 引入接口
import { setlogin, logout } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: CookieGetToken(), // 初始化vuex时先从缓存中取token
  userInfo: {},
  menuPermCodes: []
}
const mutations = {
  // 存储token
  setToken(state, token) {
    state.token = token
    CookieSetToken(token)// 将token存入缓存
  },
  // 存储userinfo
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setmenuPermCodes(sate, data) {
    state.menuPermCodes = data
  },
  removeToken(state) {
    state.token = null // 将vuex的token清空
    state.userInfo = {} // 清空用户数据
    CookieRemoveToken()
  }
}
const actions = {
  // 登录方法
  async login(context, data) {
    // 调用api
    const res = await setlogin(data)
    console.log(res, '登录返回值');
    if (res.token) {
      try {
        // api成功调用存储方法
        context.commit('setToken', res.token)
        setTimeStamp()// 设置当前的时间戳
        context.commit('setUserInfo', res.userInfo)
        context.commit('setmenuPermCodes', res.menuPermCodes)
        return res.userInfo
      } catch (error) {
        console.log(error)
      }
    }
  },
  // 退出登录
  async logquit(context) {
    await logout(state.userInfo.userName)
    context.commit('removeToken')
    resetRouter() // 重置路由
    context.commit('permission/setRoutes', [], { root: true })
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
