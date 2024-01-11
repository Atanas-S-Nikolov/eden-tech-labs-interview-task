import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import APODView from '@/views/APODView.vue'
import EarthImageView from '@/views/EarthImageView.vue'
import EnhancedEarthImage from '@/views/EnhancedEarthImage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/astronomy-picture-of-the-day',
      name: 'astronomy picture of the day',
      component: APODView
    },
    {
      path: '/current-location',
      name: 'current location',
      component: EarthImageView
    },
    {
      path: '/the-most-recent-enhanced-earth-image',
      name: 'the most recent enhanced earth image',
      component: EnhancedEarthImage
    },
  ]
})

export default router
