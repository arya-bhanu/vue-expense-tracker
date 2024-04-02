import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import { useAuthStore } from '@/stores/supabase-client'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tracker',
      name: 'home',
      component: HomeView,
      async beforeEnter() {
        const useAuth = useAuthStore()
        const { data, error } = await useAuth.getUser()
        if (error || !data.user?.id) {
          router.push({ name: 'home' })
          return
        }
        const { data: dataCheck, error: errorCheck } = await useAuth.checkRegisteredUser(
          data.user?.id
        )
        if (dataCheck && dataCheck.length === 0) {
          router.replace({ name: 'registration' })
          return
        }
        if (errorCheck || !dataCheck) {
          router.replace({ name: 'welcome' })
          return
        }
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
      async beforeEnter() {
        const useAuth = useAuthStore()
        const { data, error } = await useAuth.getUser()
        if (error || !data.user?.id) {
          router.push({ name: 'home' })
          return
        }
        const { data: dataCheck, error: errorCheck } = await useAuth.checkRegisteredUser(
          data.user?.id
        )
        if (dataCheck && dataCheck.length > 0) {
          router.replace({ name: 'home' })
          return
        }
        if (errorCheck || !dataCheck) {
          router.replace({ name: 'welcome' })
          return
        }
      }
    },
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    }
  ]
})

export default router
