import axios from 'axios';

export const axiosClientInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
});
