import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const login = async (credentials: { email: string; password: string }) => {
  return await axios.post(`${API_URL}/users/signin`, credentials);
};

export const signup = async (credentials: { email: string; password: string }) => {
  return await axios.post(`${API_URL}/users/signup`, credentials);
};
