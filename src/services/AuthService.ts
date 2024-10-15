import apiClient from './api-client';

export interface Credentials {
  mail: string;
  password: string;
}

export type CredentialsOrNull = Credentials | null;

const login = async (credentials: CredentialsOrNull) => {
  const response = await apiClient.post('/auth/login', credentials);
  const token = response.data.token;  
  saveToken(token);
  return response;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isLogged = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getTokenInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      mail: decodedToken.email,  
      role: decodedToken.role,
    };
  }
  return null;
};

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const authService = {
  login,
  logout,
  isLogged,
  getToken,
  getTokenInfo,
  saveToken,
};
