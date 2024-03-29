import axios from 'axios';

console.log('using ', process.env.BACKEND_BASE_URL, 'for http requests');

export const http = axios.create({
  baseURL: process.env.BACKEND_BASE_URL
});

export const itemHttp = axios.create({
  baseURL: process.env.ITEM_BASE_URL
});
