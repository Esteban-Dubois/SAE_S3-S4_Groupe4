import { articles, prestataires } from '@/datasource/data.js'
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

function getAllArticles() {
  const articlesUniques = new Map(articles.map(article => [article.id, article]));
  articles.splice(0, articles.length, ...articlesUniques.values());
  return { error: 0, data: [...articles] };
}

function chercherArticle(id) {
  const article = articles.find(item => item.id === id);
  return article
    ? { error: 0, data: article }
    : { error: 1, status: 404, data: "Article introuvable." };
}

function creerArticle({ name, description, price, stock, prestataireId }) {
  if (!prestataires.some(prestataire => prestataire.id === prestataireId)) {
    return { error: 1, status: 404, data: "Prestataire introuvable." };
  }

  const article = {
    id: articles.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
    name,
    description,
    price,
    stock,
    prestataireId,
  };
  articles.push(article);
  return { error: 0, data: article };
}

function modifierArticle(id, modifications) {
  const article = articles.find(item => item.id === id);
  if (!article) {
    return { error: 1, status: 404, data: "Article introuvable." };
  }
  if (!prestataires.some(prestataire => prestataire.id === modifications.prestataireId)) {
    return { error: 1, status: 404, data: "Prestataire introuvable." };
  }

  Object.assign(article, modifications);
  return { error: 0, data: article };
}

function supprimerArticle(id) {
  const index = articles.findIndex(item => item.id === id);
  if (index === -1) {
    return { error: 1, status: 404, data: "Article introuvable." };
  }
  articles.splice(index, 1);
  return { error: 0, data: true };
}

export default{
  getAllPrestataires,
  creerPrestataire,
  chercherPrestataire,
  supprimerPrestataire,
  getAllArticles,
  chercherArticle,
  creerArticle,
  modifierArticle,
  supprimerArticle,
}