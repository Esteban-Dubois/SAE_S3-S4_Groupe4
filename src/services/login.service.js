import LocalSource from "@/services/localsource.service.js";

async function loginFromLocalSource(id, nom, mdp) {
    return LocalSource.login(id, nom, mdp);
}

async function login(id, nom, mdp) {
    let response = null;
    try {
        response = await loginFromLocalSource(id, nom, mdp);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter.'  }
    }
    return response
}

export default {
    login
}

// AJOUTER DES ERREURS TYPE MDP FAUX, LOGIN FAUX... 