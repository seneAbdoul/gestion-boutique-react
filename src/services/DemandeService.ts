import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/demandes';


export const createDemande = async (demandeData: any) => {
    try {
      const response = await axios.post(API_URL, demandeData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Erreur lors de la création du demande:');
        throw new Error(`Erreur lors de la création du demande: ${error.response.data.message || 'Erreur inconnue'}`);
      } else {
        console.error('Erreur lors de la création du demande:', error.message);
        throw new Error('Erreur lors de la création du demande');
      }
    }
  };

  export const fetchDemandes = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      throw new Error('Erreur lors de la récupération des demandes');
    }
  };