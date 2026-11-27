<template>
    Nom: <input v-model="data.name" value="laurent"></input></br>
    Prénom: <input v-model="data.nickname" value="jeofres"></input></br>
    E-Mail: <input v-model="data.email" value="lojofre@test.gmail"></input></br>
    MDP: <input v-model="data.password" value="1234"></input></br>
    <button  @click="console.log(data)">Display</button>
    <button  @click="save()">TestSave</button>
</template>
<script setup>
import { ref } from 'vue'
import { saveUser } from '@/services/user.service';
let data= ref({});
function save(){
    saveUser(data.value);
}

</script>