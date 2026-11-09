import LocalSource from "@/services/localsource.service.js";

async function creerPrestataire(np_name, np_type, np_note) {
    LocalSource.creerPrestataire(np_name, np_type, np_note)
}

export default {
    creerPrestataire
}