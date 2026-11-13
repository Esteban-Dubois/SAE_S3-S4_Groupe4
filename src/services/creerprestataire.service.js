import LocalSource from "@/services/localsource.service.js";

async function creerPrestataire(np_name, np_type, np_note) {
    LocalSource.creerPrestataire(np_name, np_type, np_note)
}
if (localStorage.getItem("Prestataires")==null){
    localStorage.setItem("Prestataires","{}")
}
function saveUser(role,jsonItem){
    localStorage.setItem(role,JSON.stringify(jsonItem));
}
function getUser(){
}

export default {
    creerPrestataire,
    savePrestataire
}