import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/stand/creer',
    name: 'creer_stand',
    component: () => import('@/views/creerstand/CreerStandView.vue')
  },
  {
    path: '/stand/supprimer',
    name: 'supprimer_stand',
    component: () => import('@/views/SupprimerStandView.vue')
  },
  {
    path: '/stands',
    name: 'liste_stands',
    component: () => import('@/views/afficherstand/AfficherListeStandView.vue')
  },
  {
    path: '/stand/:id',
    name: 'afficher_stand',
    component: () => import('@/views/afficherstand/AfficherStandView.vue')
  },
  {
    path: '/articles/catalogue',
    name: 'catalogue_articles',
    component: () => import('@/views/CatalogueArticlesView.vue')
  },
  {
    path: '/user/create',
    name: 'user_create',
    component: () => import('@/views/login/CreateAccount.vue')
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
  },
  {
    path: '/user/create',
    redirect: { name: 'user_create' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
