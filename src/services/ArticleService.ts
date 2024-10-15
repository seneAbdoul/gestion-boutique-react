import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/articles';

// Fonction pour récupérer tous les articles
export const fetchArticles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    throw new Error('Erreur lors de la récupération des articles');
  }
};

// Fonction pour récupérer un article par ID
export const fetchArticleById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article avec ID ${id}:`, error);
    throw new Error(`Erreur lors de la récupération de l'article avec ID ${id}`);
  }
};

// Fonction pour créer un nouvel articl

export const createArticle = async (articleData: any) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/articles', articleData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erreur lors de la création de l\'article:');
      throw new Error(`Erreur lors de la création de l'article: ${error.response.data.message || 'Erreur inconnue'}`);
    } else {
      console.error('Erreur lors de la création de l\'article:', error.message);
      throw new Error('Erreur lors de la création de l\'article');
    }
  }
};


// Fonction pour rechercher des articles par libellé
export const fetchArticlesByLibelle = async (libelle: string) => {
  try {
    const response = await axios.post(`${API_URL}/libelle`, { libelle });
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la recherche des articles par libellé:', error);
    throw new Error('Erreur lors de la recherche des articles par libellé');
  }
};

export const updateArticleQuantite = async (id: string, quantiteStock: number) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { quantiteStock });
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la quantité de l'article avec ID ${id}:`, error);
      throw new Error(`Erreur lors de la mise à jour de la quantité de l'article avec ID ${id}`);
    }
  };
  


