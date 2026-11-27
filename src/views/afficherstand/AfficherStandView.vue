<template>
  <div>
    <button @click="router.push({ name: 'liste_stands' })" type="button">
      Retour à la liste
    </button>

    <div v-if="afficherStore.standActuel">
      <div v-if="!enEdition">
        <h2>{{ afficherStore.standActuel.nom }}</h2>
        <p><strong>ID :</strong> {{ afficherStore.standActuel.id }}</p>
        <p><strong>Type :</strong> {{ afficherStore.standActuel.type }}</p>
        <p><strong>Description :</strong> {{ afficherStore.standActuel.desc }}</p>

        <div v-if="afficherStore.standActuel.type === 'boutique' && afficherStore.detailsActuel">
          <h3>Détails Boutique</h3>
          <p><strong>ID Boutique :</strong> {{ afficherStore.detailsActuel.id }}</p>
          <p><strong>Nombre d'articles :</strong> {{ afficherStore.detailsActuel.nbArticles }}</p>
        </div>

        <div v-if="afficherStore.standActuel.type === 'restauration' && afficherStore.detailsActuel">
          <h3>Détails Restauration</h3>
          <p><strong>ID Restaurant :</strong> {{ afficherStore.detailsActuel.id }}</p>
          <p><strong>Nombre de produits :</strong> {{ afficherStore.detailsActuel.nbProduits }}</p>
          <p><strong>Allergènes :</strong> {{ afficherStore.detailsActuel.allergenes }}</p>
          <img
            v-if="afficherStore.detailsActuel.allergenes"
            :src="afficherStore.detailsActuel.allergenes"
            alt="Liste des allergènes"
          />
        </div>

        <button @click="activerEdition" type="button">Modifier</button>
      </div>

      <form v-else @submit.prevent="validerModification">
        <h2>Modifier le stand (ID : {{ afficherStore.standActuel.id }})</h2>
        <p><strong>Type :</strong> {{ afficherStore.standActuel.type }}</p>

        <div>
          <label for="nom">Nom du stand :</label>
          <input id="nom" type="text" v-model="nom" required />
        </div>

        <div>
          <label for="desc">Description :</label>
          <textarea id="desc" v-model="desc" required></textarea>
        </div>

        <CreerStandBoutiqueView
          v-if="afficherStore.standActuel.type === 'boutique'"
          v-model:nbArticles="nbArticles"
        />

        <CreerStandRestaurationView
          v-if="afficherStore.standActuel.type === 'restauration'"
          v-model:nbProduits="nbProduits"
          v-model:allergenes="allergenes"
        />

        <button type="submit">Enregistrer</button>
        <button @click="enEdition = false" type="button">Annuler</button>
      </form>

      <p v-if="message">{{ message }}</p>
    </div>

    <p v-else>Stand introuvable.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAfficherStandStore } from '@/stores/afficherstand'
import { useGererStandStore } from '@/stores/gererstand'
import CreerStandBoutiqueView from '@/views/creerstand/CreerStandBoutiqueView.vue'
import CreerStandRestaurationView from '@/views/creerstand/CreerStandRestaurationView.vue'

const route = useRoute()
const router = useRouter()
const afficherStore = useAfficherStandStore()
const gererStore = useGererStandStore()

const enEdition = ref(false)
const message = ref('')

const nom = ref('')
const desc = ref('')
const nbArticles = ref(0)
const nbProduits = ref(0)
const allergenes = ref('')

onMounted(() => {
  afficherStore.getStandById(route.params.id)
})

function activerEdition() {
  nom.value = afficherStore.standActuel.nom
  desc.value = afficherStore.standActuel.desc

  if (afficherStore.standActuel.type === 'boutique' && afficherStore.detailsActuel) {
    nbArticles.value = afficherStore.detailsActuel.nbArticles
  } else if (afficherStore.standActuel.type === 'restauration' && afficherStore.detailsActuel) {
    nbProduits.value = afficherStore.detailsActuel.nbProduits
    allergenes.value = afficherStore.detailsActuel.allergenes
  }

  message.value = ''
  enEdition.value = true
}

async function validerModification() {
  const idStand = afficherStore.standActuel.id
  const succesStand = await gererStore.modifierStand(idStand, nom.value, desc.value)

  if (succesStand) {
    if (afficherStore.standActuel.type === 'boutique') {
      await gererStore.modifierBoutique(idStand, nbArticles.value)
    } else if (afficherStore.standActuel.type === 'restauration') {
      await gererStore.modifierRestaurant(idStand, nbProduits.value, allergenes.value)
    }

    await afficherStore.getStandById(idStand)
    enEdition.value = false
    message.value = "Modifications enregistrées."
  } else {
    message.value = "Erreur lors de la modification."
  }
}
</script>