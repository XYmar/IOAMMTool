// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable */
//Vue.use(VueRouter)

// 1. 定义（路由）组件。

// 2. 定义路由
/* eslint-disable */
/*const routes = [
    { path: '/pages/xy1', component: xy1},
    { path: '/pages/xy2', component: xy2}
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
	// eslint-disable-next-line
	routes
})*/

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
