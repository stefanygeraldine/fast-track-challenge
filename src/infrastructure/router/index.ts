import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/infrastructure/views/Welcome.vue'
import { useUserStore } from '@/infrastructure/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('../views/Challenge.vue'),
      beforeEnter: async (to, from, next) => {
        const { user } = useUserStore()
        if (user.hasCompletedGame) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    }
  ]
})

export default router
