import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/api/v1/auth/register';

// Fonction pour enregistrer un utilisateur
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(AUTH_API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    throw new Error('Erreur lors de l\'enregistrement de l\'utilisateur');
  }
};