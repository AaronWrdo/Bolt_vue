import Vue from "vue";
import App from "./App.vue";
// import VueRouter from 'vue-router';
// import Routers from './router.js';
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

// Vue.use(VueRouter);
Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
