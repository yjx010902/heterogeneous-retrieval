import Vue from 'vue'
import Router from 'vue-router'

import mainpage from '../views/mainPage';
import userIntent from '../views/userIntent';
import fine_grainedAnalysis from '../views/fine_grainedAnalysis';
import full_textSearch from '../views/full_textSearch';
import  interlingualPage from  '../views/interlingualPage';
import multidimensionalPage from '../views/multidimensionalPage';
import personalizedPage from '../views/personalizedPage';


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mainPage',
      name: 'mainpage',
      component: mainpage
    },
    {
      path:'/',
      redirect:'/mainpage'
    },
    {
      path: '/userIntent',
      name: 'userIntent',
      component: userIntent
    },
    {
      path: '/fine_grainedAnalysis',
      name: 'fine_grainedAnalysis',
      component: fine_grainedAnalysis
    },
    {
      path: '/full_textSearch',
      name: 'full_textSearch',
      component: full_textSearch
    },
    {
      path: '/interlingualPage',
      name: 'interlingualPage',
      component: interlingualPage
    },
    {
      path: '/multidimensionalPage',
      name: 'multidimensionalPage',
      component: multidimensionalPage
    },
    {
      path: '/personalizedPage',
      name: 'personalizedPage',
      component: personalizedPage
    },
  ]
})
