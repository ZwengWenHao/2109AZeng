import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入树状图组件
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
