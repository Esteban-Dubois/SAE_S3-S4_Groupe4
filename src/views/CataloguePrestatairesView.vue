<template>
  <div>
    <h1>Les différents stands</h1>

    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Type</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prestataire in prestatairesStore.listePrestataires" :key="prestataire.id">
          <td>{{ prestataire.name }}</td>
          <td>{{ prestataire.type }}</td>
          <td>{{ prestataire.note }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { useCataloguePrestatairesStore } from "@/stores/catalogueprestataires.js";
import { onMounted } from "vue";

const prestatairesStore = useCataloguePrestatairesStore();

onMounted(() => {
  prestatairesStore.getAllPrestataires();
});
</script>