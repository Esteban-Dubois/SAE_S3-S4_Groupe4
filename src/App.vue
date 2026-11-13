<template>
    <h1>Convention Culture PoP</h1>
    <div>
        <router-link to="/prestataires/catalogue" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">CATALOGUE</button>
        </router-link>
        <router-link to="/prestataires/creer" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">CREER</button>
        </router-link>
        <router-link to="/prestataires/supprimer" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">SUPPRIMER</button>
        </router-link>
        <router-link to="/login" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">SE CONNECTER</button>
        </router-link>
    </div>
    <router-view></router-view>
</template>

<script setup>
import {onMounted} from "vue";
import {useCataloguePrestatairesStore} from "@/stores/catalogueprestataires.js";

const prestatairesStore = useCataloguePrestatairesStore();

onMounted(() => {
prestatairesStore.getAllPrestataires();
});
</script>

<style scoped></style>
