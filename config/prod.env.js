require('dotenv').config();
module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_API_KEY: JSON.stringify(`${process.env.FIREBASE_API_KEY}`),
  FIREBASE_AUTH_DOMAIN: JSON.stringify(`${process.env.FIREBASE_AUTH_DOMAIN}`),
  FIREBASE_DATABASE_URL: JSON.stringify(`${process.env.FIREBASE_DATABASE_URL}`),
  FIREBASE_PROJECT_ID: JSON.stringify(`${process.env.FIREBASE_PROJECT_ID}`),
  FIREBASE_STORAGE_BUCKET: JSON.stringify(`${process.env.FIREBASE_STORAGE_BUCKET}`),
  FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(`${process.env.FIREBASE_MESSAGING_SENDER_ID}`),
  LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL) || '"silent"',
  TRAVIS: process.env.TRAVIS || false,
  BACKEND_BASE_URL: JSON.stringify(`${process.env.BACKEND_BASE_URL}`),
  ITEM_BASE_URL: JSON.stringify(`${process.env.ITEM_BASE_URL}`)
};
