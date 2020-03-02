import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import store from './store'
import 'view-design/dist/styles/iview.css';
import './assets/styles/reset.css'

// 全局注册View内的所有组件，让所有组件都可以直接使用此组件
Vue.use(ViewUI);
Vue.config.productionTip = false
// 把store注入到vue实例中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
