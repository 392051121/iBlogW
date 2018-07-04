import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import backManager from '@/components/backManager'
import userList from '@/components/userList'
import catalogList from '@/components/catalogList'
import articleList from '@/components/articleList'
import articleAdd from '@/components/articleAdd'
import blogFrame from '@/components/BlogFrame'
import showArticleList from '@/components/showArticleList'
import oneArticle from '@/components/oneArticle'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blogFrame',
      component: blogFrame,
      children:[
          {
          	path: 'showArticleList',
            component: showArticleList
          },
          {
         	  path: 'oneArticle',
         	  name: 'oneArticle',
         	  component: oneArticle
          }
      ]
    },
    {
      path: '/login',
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
