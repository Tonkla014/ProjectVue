import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import create from '../components/product_add.vue'
import login from '../views/Login.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('../components/Dashboard.vue'),
    },
    {
      path: '/',
      name: 'create',
      component: create,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
