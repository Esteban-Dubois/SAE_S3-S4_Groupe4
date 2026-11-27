import { stands, boutiques, restaurants, articles  } from '@/datasource/data.js'

function creerStand(nom, type, desc) {
  const id = trouverDernierID(stands)
  const nouveauStand = {
    id: id,
    nom: nom,
    type: type,
    desc: desc
  }
  stands.push(nouveauStand)
  return { error: 0, data: nouveauStand }
}

function creerBoutique(idstand, nbArticles) {
  const id = trouverDernierID(boutiques)
  const nouvelleBoutique = {
    idstand: idstand,
    id: id,
    nbArticles: Number(nbArticles)
  }
  boutiques.push(nouvelleBoutique)
  return { error: 0, data: nouvelleBoutique }
}

function creerRestaurant(idstand, nbProduits, allergenes) {
  const id = trouverDernierID(restaurants)
  const nouveauRestaurant = {
    idstand: idstand,
    id: id,
    nbProduits: Number(nbProduits),
    allergenes: allergenes
  }
  restaurants.push(nouveauRestaurant)
  return { error: 0, data: nouveauRestaurant }
}

function supprimerStand(id) {
  const idNum = Number(id)
  const indexStand = stands.findIndex(stand => stand.id === idNum)

  if (indexStand === -1) {
    return { error: 1, data: "Stand introuvable" }
  }

  stands.splice(indexStand, 1)

  const indexBoutique = boutiques.findIndex(boutique => boutique.idstand === idNum)
  if (indexBoutique !== -1) {
    boutiques.splice(indexBoutique, 1)
  }

  const indexRestaurant = restaurants.findIndex(restaurant => restaurant.idstand === idNum)
  if (indexRestaurant !== -1) {
    restaurants.splice(indexRestaurant, 1)
  }

  return { error: 0, data: idNum }
}

function trouverDernierID(objets) {
  let dernierID = 0
  for (const objet of objets) {
    if (objet.id >= dernierID) {
      dernierID = objet.id
    }
  }
  return dernierID + 1
}

function getAllStands() {
  return { error: 0, data: stands }
}

function getStandById(id) {
  const idNum = Number(id)
  const stand = stands.find(s => s.id === idNum)

  if (!stand) {
    return { error: 1, data: "Stand introuvable" }
  }

  let details = null
  if (stand.type === 'boutique') {
    details = boutiques.find(b => b.idstand === idNum) || null
  } else if (stand.type === 'restauration') {
    details = restaurants.find(r => r.idstand === idNum) || null
  }

  return { error: 0, data: { stand, details } }
}

function modifierStand(id, nom, desc) {
  const idNum = Number(id)
  const stand = stands.find(s => s.id === idNum)
  if (!stand) {
    return { error: 1, data: "Stand introuvable" }
  }
  stand.nom = nom
  stand.desc = desc
  return { error: 0, data: stand }
}

function modifierBoutique(idstand, nbArticles) {
  const idNum = Number(idstand)
  const boutique = boutiques.find(b => b.idstand === idNum)
  if (!boutique) {
    return { error: 1, data: "Boutique introuvable" }
  }
  boutique.nbArticles = Number(nbArticles)
  return { error: 0, data: boutique }
}

function modifierRestaurant(idstand, nbProduits, allergenes) {
  const idNum = Number(idstand)
  const restaurant = restaurants.find(r => r.idstand === idNum)
  if (!restaurant) {
    return { error: 1, data: "Restaurant introuvable" }
  }
  restaurant.nbProduits = Number(nbProduits)
  restaurant.allergenes = allergenes
  return { error: 0, data: restaurant }
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
  if (!stands.some(stand => stand.id === prestataireId)) {
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
  if (!stands.some(stand => stand.id === modifications.prestataireId)) {
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
  creerStand,
  creerBoutique,
  creerRestaurant,
  supprimerStand,
  getAllStands,
  getStandById,
  modifierStand,
  modifierBoutique,
  modifierRestaurant,
  getAllArticles,
  chercherArticle,
  creerArticle,
  modifierArticle,
  supprimerArticle,
}