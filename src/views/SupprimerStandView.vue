<template>
  <div>
    <h2>Supprimer un stand</h2>

    <form @submit.prevent="validerSuppression">
      <div>
        <label for="idStand">ID du stand à supprimer :</label>
        <input
          id="idStand"
          type="number"
          min="1"
          v-model.number="idStand"
          required
        />
      </div>

      <button type="submit">Supprimer</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGererStandStore } from '@/stores/gererstand'

const store = useGererStandStore()

const idStand = ref(null)
const message = ref('')

async function validerSuppression() {
  const succes = await store.supprimerStand(idStand.value)

  if (succes) {
    message.value = `Stand ID ${idStand.value} supprimé avec succès.`
    idStand.value = null
  } else {
    message.value = `Aucun stand trouvé avec l'ID ${idStand.value}.`
  }
}
</script>