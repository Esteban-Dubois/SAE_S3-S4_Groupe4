<template>
  <div>
    <h2>Liste des stands</h2>

    <table v-if="store.stands.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stand in store.stands"
          :key="stand.id"
          @click="ouvrirStand(stand.id)"
          style="cursor: pointer;"
        >
          <td>{{ stand.id }}</td>
          <td>{{ stand.nom }}</td>
          <td>{{ stand.type }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun stand disponible.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAfficherStandStore } from '@/stores/afficherstand'

const store = useAfficherStandStore()
const router = useRouter()

onMounted(() => {
  store.getAllStands()
})

function ouvrirStand(id) {
  router.push({ name: 'afficher_stand', params: { id: id } })
}
</script>