const client = require('./rspack.client');
const server = require('./rspack.server');
const ui = require('./rspack.ui');

module.exports = {
  client: client(),
  server: server(),
  ui: ui(),
  clientServer: [client(), server()],
  clientUI: [client(), ui()],
  serverUI: [server(), ui()],
  clientServerUI: [client(), server(), ui()],
};
