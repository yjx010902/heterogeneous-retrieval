import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import '../src/assets/css/common.css'
// 引用axios
import './utils/axios'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
