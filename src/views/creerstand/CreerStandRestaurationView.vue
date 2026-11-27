<template>
  <div>
    <h3>Informations Restauration</h3>
    <div>
      <label for="nbProduits">Nombre de produits :</label>
      <input
        id="nbProduits"
        type="number"
        min="0"
        v-model.number="nbProduits"
        required
      />
    </div>
    <div>
      <label for="allergenes">Chemin vers l'image des allergènes :</label>
      <input
        id="allergenes"
        type="text"
        v-model="allergenes"
        placeholder="/images/allergenes.png"
        required
      />
    </div>
  </div>
</template>

<script setup>
const nbProduits = defineModel('nbProduits')
const allergenes = defineModel('allergenes')
</script>