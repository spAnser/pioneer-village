const client = require('../../rspack/rspack.client');
const server = require('../../rspack/rspack.server');

module.exports = [client(), server()];
