import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/clients';

// Fonction pour récupérer un client par téléphone
export const fetchClientByTelephone = async (telephone: string) => {
  try {
    const response = await axios.post(`${API_URL}/telephone`, { telephone });
    return response.data.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du client avec le téléphone ${telephone}:`, error);
    throw new Error(`Erreur lors de la récupération du client avec le téléphone ${telephone}`);
  }
};

// Fonction pour créer un nouveau client
export const createClient = async (clientData: { nom: string; prenom: string; telephone: string; adresse: string; photo: string; genre: string; }) => {
  try {
    const response = await axios.post(API_URL, clientData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du client:', error);
    throw new Error('Erreur lors de la création du client');
  }
};


// Fonction pour rechercher des clients
export const fetchClient = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des clients :', error);
    throw new Error('Erreur lors de la récupération des clients');
  }
  }

