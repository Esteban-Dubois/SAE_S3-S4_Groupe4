import LocalSource from "@/services/localsource.service.js";

async function getAllPrestatairesFromLocalSource() {
  // récupération auprès de la source locale
  return LocalSource.getAllPrestataires()
}

async function getAllPrestataires() {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAllPrestatairesFromLocalSource()
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des prestataires'  }
  }
  return response
}

export default {
  getAllPrestataires
}