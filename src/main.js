import Vue from 'vue'
import App from './App.vue'
import Vue2OrgTree from 'vue2-org-tree'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);
Vue.use(Vue2OrgTree)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
