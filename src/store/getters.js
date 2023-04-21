const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立token的快捷访问
  userInfo: state => state.user.userInfo, // 建立对userInfo的快捷访问
  menuPermCodes: state => state.user.menuPermCodes,
  routes: state => state.permission.routes

}
export default getters
