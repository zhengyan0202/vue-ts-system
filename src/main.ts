import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 使用mock模拟数据
import './mock';

import './utils/permission' // permission control
import './utils/directives';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
