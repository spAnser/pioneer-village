const client = require('../../webpack/webpack.client');
const server = require('../../webpack/webpack.server');
const ui = require('../../webpack/webpack.ui');

module.exports = [
  client(),  
  server(),  
  ui()
];
