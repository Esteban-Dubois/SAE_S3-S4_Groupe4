<template>
  <div>
    <h3>Informations Boutique</h3>
    <div>
      <label for="nbArticles">Nombre d'articles :</label>
      <input
        id="nbArticles"
        type="number"
        min="0"
        v-model.number="nbArticles"
        required
      />
    </div>
  </div>
</template>

<script setup>
const nbArticles = defineModel('nbArticles')
</script>