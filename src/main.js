// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

//router
import VueRouter from 'vue-router';

//vuex
import store from './store';

//axios
import Axios from 'axios';
// Vue.prototype.$http = Axios;
import VueAxios  from 'vue-axios';

// qs
import qs from 'qs';
Vue.prototype.$qs = qs;

//mockjs
import './mock/index'

// api
import Api from './api';
Vue.prototype.$Api = Api;

Vue.use(VueAxios, Axios);

Vue.use(VueRouter);
// 解决路由被点击两次时报错
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

Vue.use(Element);

Vue.config.productionTip = false

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

export default vue;
