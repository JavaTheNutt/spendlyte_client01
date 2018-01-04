module.exports = {
  NODE_ENV: '"production"',
  LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL) || '"silent"'
};
