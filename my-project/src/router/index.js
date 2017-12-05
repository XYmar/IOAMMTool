import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import xy1 from '@/pages/xy1'
import xy2 from '@/pages/xy2'

Vue.use(Router)

export default new Router({
  /* eslint-disable */
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
        }
      ]
    }
    
  ]
})
