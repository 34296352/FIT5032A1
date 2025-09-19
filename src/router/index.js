import { createRouter, createWebHistory } from 'vue-router'
import Activities from '../components/Activities.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'

const routes = [
  { path: '/', name: 'Home', component: Activities },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
