import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main'
import DetailPosts from '@/pages/DetailPosts'
const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts/:id',
    component: DetailPosts
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router