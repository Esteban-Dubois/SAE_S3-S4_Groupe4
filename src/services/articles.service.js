import LocalSource from "@/services/localsource.service.js";

async function getAllArticlesFromLocalSource() {
  return LocalSource.getAllArticles();
}

async function chercherArticleFromLocalSource(id) {
  return LocalSource.chercherArticle(id);
}

async function creerArticleFromLocalSource(article) {
  return LocalSource.creerArticle(article);
}

async function modifierArticleFromLocalSource(id, article) {
  return LocalSource.modifierArticle(id, article);
}

async function supprimerArticleFromLocalSource(id) {
  return LocalSource.supprimerArticle(id);
}

async function getAllArticles() {
    let response = null;
    try {
        response = await getAllArticlesFromLocalSource(nom, type, desc);
    } catch (error) {
        response = { error: 1, data: "Erreur de connexion avec la base de données" };
    }
    return response;
}

async function chercherArticle(id) {
    let response = null;
    try {
        response = await chercherArticleFromLocalSource(id);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la recherche de l'article" };
    }
    return response;
}

async function creerArticle(article) {
    let response = null;
    try {
        response = await creerArticleFromLocalSource(article);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la création de l'article" };
    }
    return response;
}

async function modifierArticle(id, article) {
    let response = null;
    try {
        response = await modifierArticleFromLocalSource(id, article);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la modification de l'article" };
    }
    return response;
}

async function supprimerArticle(id) {
    let response = null;
    try {
        response = await supprimerArticleFromLocalSource(id);
    } catch (error) {
        response = { error: 1, data: "Erreur lors de la suppression de l'article" };
    }
    return response;
}

export default {
  getAllArticles,
  chercherArticle,
  creerArticle,
  modifierArticle,
  supprimerArticle,
};
