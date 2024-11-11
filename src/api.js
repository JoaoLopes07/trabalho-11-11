// src/api.js
import axios from 'axios';

// URL do backend (API)
const API_URL = 'http://localhost:3001/api/auth';

// Função para registrar um novo usuário
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erro ao registrar usuário');
  }
};

// Função para fazer login do usuário
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erro ao fazer login');
  }
};
