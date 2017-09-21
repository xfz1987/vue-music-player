import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/views/Player'
import List from '@/views/List'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'player',component: Player},
    {path: '/list',name: 'list',component: List}
  ]
})
