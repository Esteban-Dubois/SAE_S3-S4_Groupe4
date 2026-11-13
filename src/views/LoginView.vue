<template>
    <div>
        <h1>Se connecter</h1>

        <div>
            <label for="idLogin">ID : </label><input v-model="login_id" id="idLogin" type="number" min="0">
        </div>
        <div>
            <label for="nameLogin">Nom : </label><input v-model.trim="login_nom" id="nameLogin">
        </div>
        <div>
            <label for="mdpLogin">Mot de passe : </label><input v-model.trim="login_mdp" id="mdpLogin">
        </div>
        <div>
            <p>/!\ TOUT LES CHAMPS DOIVENT ÊTRE REMPLI</p>
            <button type="button" @click="seConnecter">Se Connecter</button>
        </div>
        <div>
            <p style="color : green;">{{ login_user.id }} {{ login_user.name }} {{ login_user.role }}</p>
        </div>


    </div>
</template>

<script setup>

import { useLoginStore } from "@/stores/login.js";
import { ref, computed, onMounted } from "vue";

const loginStore = useLoginStore();

const login_id = ref(0);
const login_nom = ref("");
const login_mdp = ref("");

const login_user = ref({});

const login_id_valide = computed( () => {
    if (login_id.value === 0){
        return false;
    } else {
        return true;
    }
});

const login_nom_valide = computed( () => {
    if (login_nom.value === ""){
        return false;
    } else {
        return true;
    }
});

const login_mdp_valide = computed( () => {
    if (login_mdp.value === ""){
        return false;
    } else {
        return true;
    }
});

async function seConnecter() {
    if (login_id_valide.value && login_nom_valide.value && login_mdp_valide.value) {
        const resultat = await loginStore.login(login_id.value, login_nom.value, login_mdp.value);
        if (resultat) {
            login_user.value = resultat;
        }
    } 
}

</script>