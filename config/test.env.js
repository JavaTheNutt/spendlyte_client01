var merge = require('webpack-merge')
var devEnv = require('./dev.env')
console.log(`log level ${process.env.LOG_LEVEL}`);
module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL) || '"silent"',
  FIREBASE_PRIVATE_KEY: JSON.parse(`${process.env.FIREBASE_PRIVATE_KEY}`),
  FIREBASE_CLIENT_EMAIL: JSON.stringify(process.env.FIREBASE_CLIENT_EMAIL)
});
