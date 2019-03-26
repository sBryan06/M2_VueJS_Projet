import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lists from './views/Lists.vue'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lists',
      name: 'lists',
      component: Lists
    },
    {
      path: '/list/:id',
      name: 'list',
      component: List,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
