import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../page/index'
import User from '../page/user/index'
import Server from '../page/server/index'
import Login from '../frame/index/login'
import Content from '../page/content'

Vue.use(VueRouter);

const routers = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    name: '/',
    meta: {
      requireAuth: false
    },
    component: Index,
    children: [{
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false
      },
      component: Login
    }]
  },
  {
    path: '/content',
    name: 'content',
    meta: {
      requireAuth: true,
    },
    component: Content,
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      requireAuth: true,
    },
    component: User,
  },
  {
    path: '/server',
    name: 'server',
    meta: {
      requireAuth: true,
    },
    component: Server,
  }
]

export default routers;
