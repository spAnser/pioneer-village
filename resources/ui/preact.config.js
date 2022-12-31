const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const preactCliSvgLoader = require('preact-cli-svg-loader');

export default (config, env, helpers) => {
  preactCliSvgLoader(config, helpers);
  config.resolve.alias = {
    '@lib': path.resolve(__dirname, '../../lib'),
    '@styled': path.resolve(__dirname, 'src/ui/app/styled'),
    '@uiLib': path.resolve(__dirname, 'src/ui/app/lib'),
    ...config.resolve.alias,
  };

  /*
   * NOTE:
   * Preact CLI uses Webpack 4.
   * So we are going to modify one of the existing DefinePlugins already added by Preact CLI.
   */
  const definitions = {
    'process.env.SOCKET_USER_CONNECTION': JSON.stringify(process.env.SOCKET_USER_CONNECTION),
    'process.env.SOCKET_SERVER_CONNECTION': JSON.stringify(process.env.SOCKET_SERVER_CONNECTION),
    'process.env.SOCKET_SERVER_KEY': JSON.stringify(process.env.SOCKET_SERVER_KEY),
  };

  for (const plugin of config.plugins) {
    if (plugin.definitions) {
      plugin.definitions = {
        ...plugin.definitions,
        ...definitions,
      };
      break;
    }
  }
};
