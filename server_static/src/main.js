import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routers from './router/index'
import axios from './api/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null) {
      next();
    } else {
      next({
        path: 'login',
        query: {
          redirect: to.name
        }
      });
    }
  } else {
    if (to.name === 'login' || to.name === '/') {
      if (localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null) {
        next({
          path: 'content'
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
