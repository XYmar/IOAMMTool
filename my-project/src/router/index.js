import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import xy1 from '@/pages/xy1'
import xy2 from '@/pages/xy2'
import addUser from '@/pages/addUser'
import Axios from 'axios'

/* eslint-disable */
Axios.defaults.baseURL = 'http://192.168.0.116:8080/'  //路径提取出来，简化代码
Vue.use(Router)
Vue.prototype.$axios = Axios;

export default new Router({
  
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/xy1', 
          name: 'xy1',
          component: xy1
        },
        {
          path: '/xy2', 
          name: 'xy2',
          component: xy2
        },
        {
          path: '/addUser', 
          name: 'addUser',
          component: addUser
        }
      ]
    }
    
  ]
})
