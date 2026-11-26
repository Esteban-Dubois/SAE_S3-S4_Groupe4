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
    path: '/articles/catalogue',
    name: 'catalogue_articles',
    component: () => import('@/views/CatalogueArticlesView.vue')
  },
  {
    path: '/articles/creer',
    redirect: { name: 'catalogue_articles' }
  },
  {
    path: '/articles/modifier',
    redirect: { name: 'catalogue_articles' }
  },
  {
    path: '/articles/supprimer',
    redirect: { name: 'catalogue_articles' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
