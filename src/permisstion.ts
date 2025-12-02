import router from "./router";
import useUserStore from "./stores/modules/user";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 基础样式
import setting from "./setting";
//取消加载动画小圆球
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  NProgress.start() // 开始进度条
  let userStore = useUserStore()
  if (userStore.token) {
    if (to.path === "/login") {
      next({ path: '/' })
    } else {
      if (userStore.username) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          next({ ...to, replace: true })
        } catch (error) {
          await userStore.logoutUser()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})


router.afterEach((to: any, from: any) => {
  NProgress.done() // 请求成功结束进度条
  document.title = `${setting.title}-${to.meta.title}`
})