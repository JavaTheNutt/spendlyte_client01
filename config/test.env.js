var merge = require('webpack-merge')
var devEnv = require('./dev.env')
console.log(`log level ${process.env.LOG_LEVEL}`);
module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL) || '"silent"'
});
