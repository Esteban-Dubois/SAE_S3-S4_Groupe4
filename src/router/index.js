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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router