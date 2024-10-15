import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/categories'; 

// Fonction pour récupérer toutes les catégories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw new Error('Erreur lors de la récupération des catégories');
  }
};