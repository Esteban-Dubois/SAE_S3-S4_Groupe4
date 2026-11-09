<template>

    <div>
        <h1>Création d'un nouveau stand</h1>

        <p style="color: green;">{{ np_message_confirmation_p }}</p>
        <p style="color: red;">{{ np_message_confirmation_n }} {{ msg_err_note }}</p>

        <div>
            <div>
                <label for="nomprestataire">Nom du stand : </label><input v-model.trim="np_name" id="nomprestataires">
            </div>
            <div>
                <label for="typeprestataire">Type du stand : </label><input v-model.trim="np_type" id="typeprestataires">
            </div>
            <div>
                <label for="noteprestataire">Note du stand : </label><input v-model="np_note" id="noteprestataires" type="number" step="0.1" min="0" max="5">
            </div>
            <div>
                <p>/!\ TOUT LES CHAMPS DOIVENT ÊTRE REMPLI</p>
                <button type="button" @click="validerCreerPrestataire">Créer</button>
            </div>
        </div>
    </div>

</template>

<script setup>

import { useCreerPrestataireStore } from "@/stores/creerprestataire.js";
import { ref, computed, onMounted } from "vue";

const creerPrestataireStore = useCreerPrestataireStore();

//np = nouveau prestataire
const np_name = ref("");
const np_type = ref("");
const np_note = ref(0);
const msg_err_note = ref("");

const np_message_confirmation_p = ref("");
const np_message_confirmation_n = ref("");

const np_name_est_null = computed( () => {

    if (np_name.value === "")
    {
        return true;
    }
    else
    {
        return false;
    }    
});

const np_type_est_null = computed( () => {

    if (np_type.value === "")
    {
        return true;
    }
    else
    {
        return false;
    }    
});

const np_note_est_null = computed(() => {
    if (isNaN(np_note.value) || np_note.value < 0 || np_note.value > 5) 
    {
        msg_err_note.value = "La note doit être en 0 et 5";
        return true;
    } 
    else 
    {
        msg_err_note.value = "";
        return false;
    }
});

function validerCreerPrestataire() {
    if (!np_name_est_null.value && !np_type_est_null.value && !np_note_est_null.value) {
        creerPrestataireStore.creerPrestataire(np_name.value, np_type.value, np_note.value);
        np_message_confirmation_p.value = "Le stand a bien été créé !";
        np_message_confirmation_n.value = "";
        np_name.value = "";
        np_type.value = "";
        np_note.value = 0;
    } else {
        np_message_confirmation_p.value = "";
        np_message_confirmation_n.value = "Erreur : veuillez remplir tous les champs.";
    }
};

</script>