import { createRouter, createWebHistory, RouteLocation } from 'vue-router'

import Home from '@/views/Home.vue'
import Details from '@/views/Details.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: ':slug/:id',
        name: 'HomeDetails',
        component: Details,
        props: (route: RouteLocation) => ({ id: route.params.id }),
      },
    ],
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: Home,
    props: (route: RouteLocation) => ({ category: route.params.category }),
    children: [
      {
        path: ':slug/:id',
        name: 'CategoryDetails',
        component: Details,
        props: (route: RouteLocation) => ({ id: route.params.id }),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
