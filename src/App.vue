<template>
    <div>
        <h1>Convention culture pop</h1>
        <router-link to="/stand/creer" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">CREER</button>
        </router-link>
        <router-link to="/stand/supprimer" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">SUPPRIMER</button>
        </router-link>
        <router-link to="/stands" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">AFFICHER LES STANDS</button>
        </router-link>
        <router-link to="/articles/catalogue" custom v-slot="{ navigate }">
            <button @click="navigate" type="button">MES ARTICLES</button>
        </router-link>
    </div>
    <router-view></router-view>
</template>

<script setup>
</script>

<style scoped></style>