import { prestataires } from '@/datasource/data.js'
import {v4 as uuidv4} from 'uuid'
/* Les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Il est fortement conseillé que ces paramètres soient les mêmes que ceux qu'il faudrait envoyer à l'API.

  IMPORTANT : toutes les requêtes à l'API DOIVENT renvoyer un objet JSON au format {error: ..., status: ..., data: ...}
  Cela implique que toutes les foncitons ci-dessous renvoient un objet selon ce format.
 */

/**
 * getAllPrestataies() renvoie un tableau d'items dont le format est le même que celui stockée en source locale (donc aussi en BdD côté API)
 * @returns {{error: number, data}}
 */
function getAllPrestataires() {
  return {error: 0, data: prestataires}
}

function creerPrestataire(name, type, note) {
  const id = trouverDernierID()
  const nouveauPrestataire = {
    id: id,
    name: name,
    type: type,
    note: note
  }
  prestataires.push(nouveauPrestataire);
  return { error: 0, data: nouveauPrestataire };
}

function trouverDernierID() {
  let dernierID = 0;
  for (const prestataire of prestataires) {
    if (prestataire.id >= dernierID) {
      dernierID = prestataire.id;
    }
  }
  return dernierID + 1;
}

function chercherPrestataire(id) {
  for (const prestataire of prestataires) {
    if (prestataire.id === id) {
      return { error: 0, data: prestataire };
    }
  }
}

function supprimerPrestataire(id) {
  const index = prestataires.findIndex(prestataire => prestataire.id === id);
  if (index !== -1) {
    prestataires.splice(index, 1);
  }
}

export default{
  getAllPrestataires,
  creerPrestataire,
  chercherPrestataire,
  supprimerPrestataire
}