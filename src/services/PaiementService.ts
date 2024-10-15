import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/paiements';

// Fonction pour rechercher des paiements par ID de dette
export const fetchPaiementByIdDette = async (idDette: number) => {
  try {
    // Requête GET pour récupérer les paiements par ID de dette
    const response = await axios.get(`${API_URL}/${idDette}`);
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la recherche des paiements pour la dette :', error);
    throw new Error('Erreur lors de la recherche des paiements pour la dette');
  }
};

// Fonction pour créer un paiement
export const createPaiement = async (paiementData: { montant: number; date: Date; detteId: number }) => {
  try {
    const response = await axios.post(API_URL, paiementData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erreur lors de la création du paiement:', error.response.data.message || 'Erreur inconnue');
      throw new Error(`Erreur lors de la création du paiement: ${error.response.data.message || 'Erreur inconnue'}`);
    } else {
      console.error('Erreur lors de la création du paiement:', error.message);
      throw new Error('Erreur lors de la création du paiement');
    }
  }
};
