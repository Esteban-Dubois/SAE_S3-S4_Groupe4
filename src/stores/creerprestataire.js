import { defineStore } from 'pinia'
import CreerPrestataireService from '@/services/creerprestataire.service'

export const useCreerPrestataireStore = defineStore('creerprestataire', () => {

    async function creerPrestataire(np_name, np_type, np_note) {
        CreerPrestataireService.creerPrestataire(np_name, np_type, np_note)
    }

    return { creerPrestataire }
})