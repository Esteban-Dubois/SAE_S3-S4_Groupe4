import LocalSource from "@/services/localsource.service.js";

async function creerStandFromLocalSource(nom, type, desc) {
    return LocalSource.creerStand(nom, type, desc);
}

async function creerBoutiqueFromLocalSource(idstand, nbArticles) {
    return LocalSource.creerBoutique(idstand, nbArticles);
}

async function creerRestaurantFromLocalSource(idstand, nbProduits, allergenes) {
    return LocalSource.creerRestaurant(idstand, nbProduits, allergenes);
}

async function supprimerStandFromLocalSource(id) {
    return LocalSource.supprimerStand(id);
}

async function creerStand(nom, type, desc) {
    let response = null;
    try {
        response = await creerStandFromLocalSource(nom, type, desc);
    } catch (error) {
        response = { error: 1, data: "Erreur de connexion avec la base de données" };
    }
    return response;
}

async function creerBoutique(idstand, nbArticles) {
    let response = null;
    try {
        response = await creerBoutiqueFromLocalSource(idstand, nbArticles);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la création de la boutique" };
    }
    return response;
}

async function creerRestaurant(idstand, nbProduits, allergenes) {
    let response = null;
    try {
        response = await creerRestaurantFromLocalSource(idstand, nbProduits, allergenes);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la création du restaurant" };
    }
    return response;
}

async function supprimerStand(id) {
    let response = null;
    try {
        response = await supprimerStandFromLocalSource(id);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la suppression du stand" };
    }
    return response;
}

export default {
    creerStand,
    creerBoutique,
    creerRestaurant,
    supprimerStand
}