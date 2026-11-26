import { ref } from "vue";
import { defineStore } from "pinia";
import ArticlesService from "@/services/articles.service.js";

export const useArticlesStore = defineStore("articles", () => {
  const listeArticles = ref([]);

  async function getAllArticles() {
    const response = await ArticlesService.getAllArticles();
    if (response.error === 0) {
      listeArticles.value = response.data;
    }
    return response;
  }

  async function chercherArticle(id) {
    const response = await ArticlesService.chercherArticle(id);
    return response.error === 0 ? response.data : null;
  }

  async function creerArticle(article) {
    const response = await ArticlesService.creerArticle(article);
    if (response.error === 0) {
      const index = listeArticles.value.findIndex(item => item.id === response.data.id);
      if (index === -1) {
        listeArticles.value.push(response.data);
      } else {
        listeArticles.value[index] = response.data;
      }
    }
    return response;
  }

  async function modifierArticle(id, article) {
    const response = await ArticlesService.modifierArticle(id, article);
    if (response.error === 0) {
      const index = listeArticles.value.findIndex(item => item.id === id);
      if (index !== -1) {
        listeArticles.value[index] = response.data;
      }
    }
    return response;
  }

  async function supprimerArticle(id) {
    const response = await ArticlesService.supprimerArticle(id);
    if (response.error === 0) {
      listeArticles.value = listeArticles.value.filter(item => item.id !== id);
    }
    return response;
  }

  return {
    listeArticles,
    getAllArticles,
    chercherArticle,
    creerArticle,
    modifierArticle,
    supprimerArticle,
  };
});
