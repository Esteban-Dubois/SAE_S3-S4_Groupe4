import { ref } from 'vue'
import { defineStore } from 'pinia'

import CataloguePrestatairesService from '@/services/catalogueprestataires.service'

export const useGlobalStore = defineStore('globalStore', () => {

    const username=ref("")
    const role=ref("")
    const mail=ref("")
    const isLoggedIn=computed(()=>{
        username  && role && mail
    })
    function logout(){
        username=""
        role=""
        mail=""
    }

  return { logout, getAllPrestataires}
})
