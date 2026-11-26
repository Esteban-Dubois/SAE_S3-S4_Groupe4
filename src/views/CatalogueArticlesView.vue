<template>
  <div>
    <h1>Mes articles</h1>
    <p>Choisissez le stand auquel appartiennent les articles que vous gérez.</p>

    <div>
      <label for="article-provider">Prestataire / stand : </label>
      <select id="article-provider" v-model.number="prestataireId" @change="changerPrestataire">
        <option disabled value="">Choisir un prestataire</option>
        <option
          v-for="prestataire in prestatairesStore.listePrestataires"
          :key="prestataire.id"
          :value="prestataire.id"
        >
          {{ prestataire.name }}
        </option>
      </select>
    </div>

    <template v-if="prestataireActif">
      <h2>{{ articleEnEditionId === null ? "Créer un article" : "Modifier l'article" }}</h2>
      <p v-if="message" :style="{ color: erreur ? 'red' : 'green' }">{{ message }}</p>

      <form @submit.prevent="enregistrerArticle">
        <div>
          <label for="article-name">Nom : </label>
          <input id="article-name" v-model.trim="form.name" required>
        </div>
        <div>
          <label for="article-description">Description : </label>
          <textarea id="article-description" v-model.trim="form.description" required></textarea>
        </div>
        <div>
          <label for="article-price">Prix (€) : </label>
          <input id="article-price" v-model.number="form.price" type="number" min="0" step="0.01" required>
        </div>
        <div>
          <label for="article-stock">Stock disponible : </label>
          <input id="article-stock" v-model.number="form.stock" type="number" min="0" step="1" required>
        </div>
        <button type="submit">
          {{ articleEnEditionId === null ? "Créer l'article" : "Enregistrer les modifications" }}
        </button>
        <button v-if="articleEnEditionId !== null" type="button" @click="annulerEdition">
          Annuler
        </button>
      </form>

      <h2>Articles de {{ prestataireActif.name }}</h2>
      <p v-if="articlesDuPrestataire.length === 0">Ce stand n'a pas encore d'article.</p>
      <table v-else>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Stock disponible</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articlesDuPrestataire" :key="article.id">
            <td>{{ article.name }}</td>
            <td>{{ article.description }}</td>
            <td>{{ article.price }} €</td>
            <td>{{ article.stock }}</td>
            <td>
              <template v-if="articleASupprimerId === article.id">
                <span>Confirmer la suppression ? </span>
                <button type="button" @click="supprimerArticle(article.id)">Confirmer</button>
                <button type="button" @click="articleASupprimerId = null">Annuler</button>
              </template>
              <template v-else>
                <button type="button" @click="preparerModification(article)">Modifier</button>
                <button type="button" @click="demanderSuppression(article.id)">Supprimer</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useArticlesStore } from "@/stores/articles.js";
import { useCataloguePrestatairesStore } from "@/stores/catalogueprestataires.js";

const articlesStore = useArticlesStore();
const prestatairesStore = useCataloguePrestatairesStore();
const prestataireId = ref("");
const articleEnEditionId = ref(null);
const articleASupprimerId = ref(null);
const message = ref("");
const erreur = ref(false);
const form = reactive({
  name: "",
  description: "",
  price: 0,
  stock: 0,
});

const prestataireActif = computed(() =>
  prestatairesStore.listePrestataires.find(
    prestataire => prestataire.id === Number(prestataireId.value),
  ),
);

const articlesDuPrestataire = computed(() =>
  articlesStore.listeArticles.filter(
    article => article.prestataireId === Number(prestataireId.value),
  ),
);

function viderFormulaire() {
  Object.assign(form, { name: "", description: "", price: 0, stock: 0 });
  articleEnEditionId.value = null;
}

function changerPrestataire() {
  viderFormulaire();
  articleASupprimerId.value = null;
  message.value = "";
  erreur.value = false;
}

function preparerModification(article) {
  Object.assign(form, {
    name: article.name,
    description: article.description,
    price: article.price,
    stock: article.stock,
  });
  articleEnEditionId.value = article.id;
  articleASupprimerId.value = null;
  message.value = "";
}

function annulerEdition() {
  viderFormulaire();
  message.value = "";
  erreur.value = false;
}

async function enregistrerArticle() {
  const article = {
    ...form,
    prestataireId: Number(prestataireId.value),
  };
  const response = articleEnEditionId.value === null
    ? await articlesStore.creerArticle(article)
    : await articlesStore.modifierArticle(articleEnEditionId.value, article);

  erreur.value = response.error !== 0;
  message.value = erreur.value
    ? response.data
    : articleEnEditionId.value === null
      ? "L'article a bien été créé."
      : "L'article a bien été modifié.";
  if (!erreur.value) {
    viderFormulaire();
  }
}

function demanderSuppression(id) {
  articleASupprimerId.value = id;
  message.value = "";
  erreur.value = false;
}

async function supprimerArticle(id) {
  const response = await articlesStore.supprimerArticle(id);
  erreur.value = response.error !== 0;
  message.value = erreur.value ? response.data : "L'article a bien été supprimé.";
  if (!erreur.value) {
    articleASupprimerId.value = null;
    if (articleEnEditionId.value === id) {
      viderFormulaire();
    }
  }
}

onMounted(() => {
  articlesStore.getAllArticles();
  prestatairesStore.getAllPrestataires();
});
</script>
