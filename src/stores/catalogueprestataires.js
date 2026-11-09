import { ref } from 'vue'
import { defineStore } from 'pinia'

import CataloguePrestatairesService from '@/services/catalogueprestataires.service'

export const useCataloguePrestatairesStore = defineStore('catalogueprestataires', () => {

  const listePrestataires = ref([])

  async function getAllPrestataires() {
    console.log('récupération des prestataires');
    let response = await CataloguePrestatairesService.getAllPrestataires()
    if (response.error === 0) {
      listePrestataires.value = response.data
    }
    else {
      console.log(response.data)
    }
  }

  return { listePrestataires, getAllPrestataires}
})
