import { defineStore } from 'pinia'
import SupprimerPrestataireService from '@/services/supprimerprestataire.service'

export const useSupprimerPrestataireStore = defineStore('supprimerprestataire', () => {

    async function chercherPrestataire(id) {
        console.log('récupération du prestataire');
        let response = await SupprimerPrestataireService.chercherPrestataire(id)
        if (response.error === 0) {
            return response.data;
        }
        else {
            console.log(response.data);
        }
    }

    async function supprimerPrestataire(id) {
        SupprimerPrestataireService.supprimerPrestataire(id);
    }

    return { chercherPrestataire, supprimerPrestataire }
})