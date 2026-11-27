<template>
  <div>
    <h2>Créer un stand</h2>

    <form @submit.prevent="validerCreation">
      <div>
        <label for="nom">Nom du stand :</label>
        <input id="nom" type="text" v-model="nom" required />
      </div>

      <div>
        <label for="desc">Description :</label>
        <textarea id="desc" v-model="desc" required></textarea>
      </div>

      <div>
        <label for="type">Type de stand :</label>
        <select id="type" v-model="type" required>
          <option value="" disabled>-- Choisir un type --</option>
          <option value="boutique">Boutique</option>
          <option value="restauration">Restauration</option>
        </select>
      </div>

      <CreerStandBoutiqueView
        v-if="type === 'boutique'"
        v-model:nbArticles="nbArticles"
      />

      <CreerStandRestaurationView
        v-if="type === 'restauration'"
        v-model:nbProduits="nbProduits"
        v-model:allergenes="allergenes"
      />

      <button type="submit" v-if="type !== ''">Créer le stand</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGererStandStore } from '@/stores/gererstand'
import CreerStandBoutiqueView from './CreerStandBoutiqueView.vue'
import CreerStandRestaurationView from './CreerStandRestaurationView.vue'

const store = useGererStandStore()

const nom = ref('')
const desc = ref('')
const type = ref('')

const nbArticles = ref(0)
const nbProduits = ref(0)
const allergenes = ref('')

const message = ref('')

async function validerCreation() {
  const idStand = await store.creerStand(nom.value, type.value, desc.value)

  if (idStand > 0) {
    if (type.value === 'boutique') {
      await store.creerBoutique(idStand, nbArticles.value)
    } else if (type.value === 'restauration') {
      await store.creerRestaurant(idStand, nbProduits.value, allergenes.value)
    }

    message.value = `Stand "${nom.value}" (ID : ${idStand}) créé avec succès !`

    nom.value = ''
    desc.value = ''
    type.value = ''
    nbArticles.value = 0
    nbProduits.value = 0
    allergenes.value = ''
  } else {
    message.value = "Erreur lors de la création du stand."
  }
}
</script>