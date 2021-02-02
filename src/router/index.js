import { createRouter, createWebHistory } from 'vue-router'
import Search from '../views/Search.vue'
import Results from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/search-results',
    name: 'Results',
    component: Results
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
