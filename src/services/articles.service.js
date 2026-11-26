import LocalSource from "@/services/localsource.service.js";

async function getAllArticles() {
  return LocalSource.getAllArticles();
}

async function chercherArticle(id) {
  return LocalSource.chercherArticle(id);
}

async function creerArticle(article) {
  return LocalSource.creerArticle(article);
}

async function modifierArticle(id, article) {
  return LocalSource.modifierArticle(id, article);
}

async function supprimerArticle(id) {
  return LocalSource.supprimerArticle(id);
}

export default {
  getAllArticles,
  chercherArticle,
  creerArticle,
  modifierArticle,
  supprimerArticle,
};
