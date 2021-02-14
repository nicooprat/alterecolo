import { createRouter, createWebHistory, RouteLocation } from 'vue-router'
import Home from '/src/views/Home.vue'
import Details from '/src/views/Home.vue'
import Category from '/src/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/alternative/:slug/:id',
    name: 'Details',
    component: Details,
    props: (route: RouteLocation) => ({ id: route.params.id }),
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: Category,
    props: (route: RouteLocation) => ({
      category: route.params.category,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
