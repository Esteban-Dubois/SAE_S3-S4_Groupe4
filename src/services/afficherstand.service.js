import LocalSource from "@/services/localsource.service.js";

async function getAllStandsFromLocalSource() {
    return LocalSource.getAllStands();
}

async function getStandByIdFromLocalSource(id) {
    return LocalSource.getStandById(id);
}

async function getAllStands() {
    let response = null;
    try {
        response = await getAllStandsFromLocalSource();
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la récupération des stands" };
    }
    return response;
}

async function getStandById(id) {
    let response = null;
    try {
        response = await getStandByIdFromLocalSource(id);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la récupération du stand" };
    }
    return response;
}

export default {
    getAllStands,
    getStandById
}