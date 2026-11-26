import { ref } from 'vue'
import { defineStore } from 'pinia'
import GererStandService from '@/services/gererstand.service'

export const useGererStandStore = defineStore('gererstand', () => {
    const id = ref(0);

    async function creerStand(nom, type, desc) {
        const response = await GererStandService.creerStand(nom, type, desc)
        if (response.error > 0) {
            console.log("code erreur : " + response.error + " - message : " + response.data)
            id.value = 0
            return 0
        } else {
            id.value = response.data.id
            return response.data.id
        }
    }

    async function creerBoutique(idstand, nbArticles) {
        const response = await GererStandService.creerBoutique(idstand, nbArticles)
        if (response.error > 0) {
            console.log("code erreur : " + response.error + " - message : " + response.data)
            return null
        }
        return response.data
    }

    async function creerRestaurant(idstand, nbProduits, allergenes) {
        const response = await GererStandService.creerRestaurant(idstand, nbProduits, allergenes)
        if (response.error > 0) {
            console.log("code erreur : " + response.error + " - message : " + response.data)
            return null
        }
        return response.data
    }

    async function supprimerStand(idStand) {
        const response = await GererStandService.supprimerStand(idStand)
        if (response.error > 0) {
            console.log("code erreur : " + response.error + " - message : " + response.data)
            return false
        }
        return true
    }

    return { id, creerStand, creerBoutique, creerRestaurant, supprimerStand }
})