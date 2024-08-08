import Vue from 'vue'
// 操作cookie, 后端返回的token存储在cookie中
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
// 引入element-ui的样式
import './styles/element-variables.scss'
// 引入国际包 国际化
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// 引入自己写的scss全局样式
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// 引入自己封装的icon图标
import './icons' // icon
// 引入权限模块, 非常重要
import './permission' // permission control
import './utils/error-log' // error log
// 引入过滤器
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// process是node中的全局变量
// 当通过npm run build时，node_env就是production
// 当通过npm run dev时，node_env就是development
// process.env.NODE_ENV === 'production' 表示是生成环境
if (process.env.NODE_ENV === 'production') {
  // 导入mock模块，模拟接口数据，本项目中的接口，都是模拟的，都是假的
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  // Button  可以设置尺寸  如果不设置默认是medium
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang 表示组件使用英文
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 关闭生产环境下的vue提示
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
