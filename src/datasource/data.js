let stands = [
  { id: 1, nom: "Boutique Figurine", type: "boutique", desc: "Vente de figurines tout droit importées du japon !" },
  { id: 2, nom: "Ramen de Wish", type: "restauration", desc: "Ramen fait avec le coeur !" }
];

let boutiques = [
  { idstand: 1, id: 1, nbArticles: 150 }
];

let restaurants = [
  { idstand: 2, id: 1, nbProduits: 12, allergenes: "/images/allergenes-ramen.png" }
];

const articles = [];

export { 
  stands,
  boutiques,
  restaurants,
  articles
 };