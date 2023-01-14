import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomePage from './components/HomePage.vue'

Vue.config.productionTip = false


Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomePage },
]

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
