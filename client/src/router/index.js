import Vue from 'vue';
import Router from 'vue-router';

import Index from '../pages/Index/Index';
import Test from '../pages/Test/Test';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
});
