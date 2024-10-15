import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/dettes';


export const createDette = async (detteData: any) => {
    try {
      const response = await axios.post(API_URL, detteData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Erreur lors de la création du dette:');
        throw new Error(`Erreur lors de la création du dette: ${error.response.data.message || 'Erreur inconnue'}`);
      } else {
        console.error('Erreur lors de la création du dette:', error.message);
        throw new Error('Erreur lors de la création du dette');
      }
    }
  };