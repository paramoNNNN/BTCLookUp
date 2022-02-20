import axios from 'axios';

export const baseURL = process.env.BLOCKCYPHER_API_URL;

export const axiosInstance = axios.create({
	baseURL: baseURL,
	method: 'POST',
	timeout: 30000,
});
