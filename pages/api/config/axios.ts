import axios from 'axios';

export const baseURL = process.env.BLOCKCYPHER_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});
