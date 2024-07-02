const client = require('../../rspack/rspack.client');
const server = require('../../rspack/rspack.server');
const ui = require('../../rspack/rspack.ui');

module.exports = [client(), server(), ui()];
