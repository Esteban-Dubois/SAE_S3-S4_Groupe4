<template>
    <div>
        <h1>Supprimer un prestataire</h1>

        <p style="color: red;">{{ msg_err_id }} {{ msg_err_res }}</p>

        <div>
            <label for="idprestataire">ID : </label><input v-model.trim="id" id="idprestataire" type="number" min="0">
        </div>
        <div>
            <button type="button" @click="chercherPrestataire">Chercher</button>
        </div>
        <div>
            <p>{{ prestataire.id }}   {{ prestataire.name }}   {{ prestataire.type }}   {{ prestataire.note }}</p>
        </div>
        <div>
            <button type="button" @click="supprimerPrestataire">Supprimer</button>
        </div>

    </div>
</template>

<script setup>

import { useSupprimerPrestataireStore } from "@/stores/supprimerprestataire.js";
import { ref, computed } from "vue";

const id = ref(0);
const prestataire = ref({});
const supprimerPrestataireStore = useSupprimerPrestataireStore();

const msg_err_id = ref("");
const msg_err_res = ref("");

const id_est_null = computed(() => {
    if (isNaN(id.value) || id.value <= 0) {
        msg_err_id.value = "L'ID est forcément supérieur à 0 !";
        return true;
    } else {
        msg_err_id.value = "";
        return false;
    }
});

async function chercherPrestataire() {
    if (id_est_null.value === false) {
        const resultat = await supprimerPrestataireStore.chercherPrestataire(Number(id.value));
        if (resultat) {
            prestataire.value = resultat;
            msg_err_res = "";
        } else 
        {
            msg_err_res.value = "Il n'y a pas de prestataire avec cet ID.";
        }
    } else 
    {
        msg_err_id = "Un ID est nécessaire."
    }
}

function supprimerPrestataire() {
    if (id_est_null.value === false) {
        supprimerPrestataireStore.supprimerPrestataire(Number(id.value));
        prestataire.value = {};
    } else 
    {
        msg_err_id = "Un ID est nécessaire."
    }
}

</script>