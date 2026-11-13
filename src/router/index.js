import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/prestataires/catalogue',
    name: 'catalogue_prestataires',
    component: () => import('@/views/CataloguePrestatairesView.vue')
  },
  {
    path: '/prestataires/creer',
    name: 'creer_prestataire',
    component: () => import('@/views/CreerPrestataireView.vue')
  },
  {
    path: '/prestataires/supprimer',
    name: 'supprimer_prestataire',
    component: () => import('@/views/SupprimerPrestataireView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
