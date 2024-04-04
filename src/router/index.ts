import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import { useAuthStore } from '@/stores/supabase-client'
import { nextTick } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tracker',
      name: 'home',
      meta: {
        title: `${import.meta.env.VITE_TITLE} | Dashboard`
      },
      component: HomeView,
      async beforeEnter() {
        const useAuth = useAuthStore()
        const { data, error } = await useAuth.getUser()
        if (error || !data.user?.id) {
          router.push({ name: 'welcome' })
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
      meta: {
        title: `${import.meta.env.VITE_TITLE} | Registration`
      },
      async beforeEnter() {
        const useAuth = useAuthStore()
        const { data, error } = await useAuth.getUser()
        if (error || !data.user?.id) {
          router.push({ name: 'welcome' })
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
      meta: {
        title: `${import.meta.env.VITE_TITLE} |  Hello World`
      },
      component: WelcomeView
    }
  ]
})

router.afterEach((to) => {
  nextTick(() => {
    if (typeof to.meta === 'string') {
      document.title = to.meta || 'Vue Expenses'
    }
  })
})

export default router
