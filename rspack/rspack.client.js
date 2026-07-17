const path = require('path');
const HotReloadPlugin = require('./rspack.hot-reload');

// @ts-check
/** @type {import('@rspack/cli').Configuration} */
module.exports = () => ({
  name: 'client',
  entry: ['@lib/client/logger.ts', path.resolve('./src/client/client.ts')],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /build/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [new HotReloadPlugin('client')],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    tsConfig: { configFile: path.resolve('./src/client/tsconfig.json') },
  },
  output: {
    path: path.resolve('./build'),
    filename: 'client.js',
  },
  performance: {
    hints: false,
  },
});
