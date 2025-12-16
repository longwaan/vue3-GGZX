import { createApp } from 'vue'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import './permisstion'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)

app.use(pinia)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册自定义的SvgIcon组件
app.component('SvgIcon', SvgIcon)

app.use(ElementPlus, {
    locale: zhCn,
})

app.mount('#app')
