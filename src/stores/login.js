import { defineStore } from 'pinia'
import LoginService from '@/services/login.service'

export const useLoginStore = defineStore('login', () => {
    async function login(id, nom, mdp) {
        console.log("récupération de l'utilisateur");
        let response = await LoginService.login(id, nom, mdp);
        if (response.error === 0) {
            return response.data;
        } else {
            console.log(response.data);
        }
    }

    return { login }
})