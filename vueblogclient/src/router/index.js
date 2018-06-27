import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import backManager from '@/components/backManager'
import userList from '@/components/userList'
import catalogList from '@/components/catalogList'
import articleList from '@/components/articleList'
import articleAdd from '@/components/articleAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    	path:'/backManager',
    	name:'backManager',
    	component:backManager,
    	children:[
    	    {
              path: 'userList', 
              component: userList
         },
         {
         	    path: 'catalogList', 
              component: catalogList
         },
         {
         	    path: 'articleList', 
              component: articleList
         },
         {
         	    path: 'articleAdd', 
              component: articleAdd
         }
    	]
    }
  ]
})
