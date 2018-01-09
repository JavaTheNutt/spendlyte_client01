const express = require('express');
const path = require('path');
const app = express();
const distDir = '../dist';
app.use(express.static(path.join(__dirname, distDir)));

let _resolve;
const readyPromise = new Promise(resolve => (_resolve = resolve));

const server = app.listen(process.env.PORT || 9090, () => {
  console.log('server started');
  _resolve();
});

module.exports = {
  ready: readyPromise,
  close: () => server.close()
};

