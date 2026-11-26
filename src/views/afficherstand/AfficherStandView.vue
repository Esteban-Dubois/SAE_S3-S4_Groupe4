<template>
  <div>
    <button @click="router.push({ name: 'liste_stands' })" type="button">
      Retour à la liste
    </button>

    <div v-if="store.standActuel">
      <h2>{{ store.standActuel.nom }}</h2>
      <p><strong>ID :</strong> {{ store.standActuel.id }}</p>
      <p><strong>Type :</strong> {{ store.standActuel.type }}</p>
      <p><strong>Description :</strong> {{ store.standActuel.desc }}</p>

      <div v-if="store.standActuel.type === 'boutique' && store.detailsActuel">
        <h3>Détails Boutique</h3>
        <p><strong>ID Boutique :</strong> {{ store.detailsActuel.id }}</p>
        <p><strong>Nombre d'articles :</strong> {{ store.detailsActuel.nbArticles }}</p>
      </div>

      <div v-if="store.standActuel.type === 'restauration' && store.detailsActuel">
        <h3>Détails Restauration</h3>
        <p><strong>ID Restaurant :</strong> {{ store.detailsActuel.id }}</p>
        <p><strong>Nombre de produits :</strong> {{ store.detailsActuel.nbProduits }}</p>
        <p><strong>Allergènes :</strong> {{ store.detailsActuel.allergenes }}</p>
        <img
          v-if="store.detailsActuel.allergenes"
          :src="store.detailsActuel.allergenes"
          alt="Liste des allergènes"
        />
      </div>
    </div>

    <p v-else>Stand introuvable.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAfficherStandStore } from '@/stores/afficherstand'

const route = useRoute()
const router = useRouter()
const store = useAfficherStandStore()

onMounted(() => {
  store.getStandById(route.params.id)
})
</script>