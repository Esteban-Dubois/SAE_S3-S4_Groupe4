import LocalSource from "@/services/localsource.service.js";

async function chercherPrestataireParID(id) {
    return LocalSource.chercherPrestataire(id);
}

async function chercherPrestataire(id) {
    let response = null;
    try {
        response = await chercherPrestataireParID(id);
    }
    catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le prestataire recherché.'  }
    }
    return response
}

async function supprimerPrestataire(id) {
    LocalSource.supprimerPrestataire(id);
}

export default {
    chercherPrestataire,
    supprimerPrestataire
}