import { ref } from 'vue'
import { defineStore } from 'pinia'
import AfficherStandService from '@/services/afficherstand.service'

export const useAfficherStandStore = defineStore('afficherstand', () => {
    const stands = ref([])
    const standActuel = ref(null)
    const detailsActuel = ref(null)

    async function getAllStands() {
        const response = await AfficherStandService.getAllStands()
        if (response.error > 0) {
            console.log("code erreur : " + response.error + " - message : " + response.data)
            stands.value = []
        } else {
            stands.value = response.data
        }
    }

    async function getStandById(id) {
        const response = await AfficherStandService.getStandById(id)
        if (response.error > 0) {
            console.log("code erreur : " + response.error + " - message : " + response.data)
            standActuel.value = null
            detailsActuel.value = null
        } else {
            standActuel.value = response.data.stand
            detailsActuel.value = response.data.details
        }
    }

    return { stands, standActuel, detailsActuel, getAllStands, getStandById }
})