var merge = require('webpack-merge')
var devEnv = require('./dev.env')
console.log(`log level ${process.env.LOG_LEVEL}`);
module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL) || '"silent"',
  FIREBASE_KEY_TYPE: JSON.stringify(`${process.env.FIREBASE_KEY_TYPE}`),
  FIREBASE_PRIVATE_KEY_ID: JSON.stringify(`${process.env.FIREBASE_PRIVATE_KEY_ID}`),
  FIREBASE_PRIVATE_KEY: JSON.stringify(`${process.env.FIREBASE_PRIVATE_KEY}`),
  FIREBASE_CLIENT_EMAIL: JSON.stringify(`${process.env.FIREBASE_CLIENT_EMAIL}`),
  FIREBASE_CLIENT_ID: JSON.stringify(`${process.env.FIREBASE_CLIENT_ID}`),
  FIREBASE_AUTH_URI: JSON.stringify(`${process.env.FIREBASE_AUTH_URI}`),
  FIREBASE_TOKEN_URI: JSON.stringify(`${process.env.FIREBASE_TOKEN_URI}`),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: JSON.stringify(`${process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL}`),
  FIREBASE_CLIENT_X509_CERT_URL: JSON.stringify(`${process.env.FIREBASE_CLIENT_X509_CERT_URL}`)
});
