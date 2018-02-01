var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOG_LEVEL: '"trace"',
  BACKEND_BASE_URL: JSON.stringify(`${process.env.LOCAL_BACKEND_BASE_URL}`)
});
