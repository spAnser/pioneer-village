const client = require('../../webpack/webpack.client');
const server = require('../../webpack/webpack.server');

module.exports = [client(), server()];
