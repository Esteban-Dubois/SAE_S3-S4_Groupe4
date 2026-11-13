<template>
    <div>
        <h1>Création d'un compte</h1>
        <p style="color: green;">{{ nc_message_confirmation_p }}</p>
        <p style="color: red;">{{ nc_message_confirmation_n }} {{ msg_err_mdp }}</p>
        <div>
            <div>
                <label for="nomcompte">Nom du compte : </label><input v-model.trim="nc_name" id="nomcompte">
            </div>
            <div>
                <label for="mdpcompte">Mot de passe : </label><input v-model.trim="nc_password" id="mdpcompte" type="password">
            </div>
            <div>
                <label for="confmdpcompte">Confirmer le mot de passe : </label><input v-model.trim="nc_confirm_password" id="confmdpcompte" type="password">
            </div>
            <div>
                <p>/!\ TOUT LES CHAMPS DOIVENT ÊTRE REMPLI</p>
                <button type="button" @click="validerCreerCompte">Créer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCreerCompteStore } from "@/stores/creercompte.js";
import { ref, computed } from "vue";

const creerCompteStore = useCreerCompteStore();

//nc = nouveau compte
const nc_name = ref("");
const nc_password = ref("");
const nc_confirm_password = ref("");
const msg_err_mdp = ref("");

const nc_message_confirmation_p = ref("");
const nc_message_confirmation_n = ref("");

const nc_name_est_null = computed( () => {

    if (nc_name.value === "")
    {
        return true;
    }
    else
    {
        return false;
    }    
});

const nc_password_est_null = computed( () => {

    if (nc_password.value === "")
    {
        return true;
    }
    else
    {
        return false;
    }    
});

const nc_confirm_password_est_null = computed( () => {

    if (nc_confirm_password.value === "")
    {
        return true;
    }
    else
    {
        return false;
    }    
});

function validerCreerCompte() {
    if (nc_name_est_null.value || nc_password_est_null.value || nc_confirm_password_est_null.value) {
        nc_message_confirmation_n.value = "Veuillez remplir tous les champs.";
        nc_message_confirmation_p.value = "";
        return;
    }

    if (nc_password.value !== nc_confirm_password.value) {
        msg_err_mdp.value = "Les mots de passe ne correspondent pas.";
        nc_message_confirmation_n.value = "";
        nc_message_confirmation_p.value = "";
        return;
    }

    creerCompteStore.creerCompte(nc_name.value, nc_password.value);
    nc_message_confirmation_p.value = "Compte créé avec succès !";
    nc_message_confirmation_n.value = "";
    msg_err_mdp.value = "";
}

</script>