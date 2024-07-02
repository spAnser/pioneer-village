const path = require('path');
const HotReloadPlugin = require('./rspack.hot-reload');

module.exports = () => ({
  entry: path.resolve('./src/client/client.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
  plugins: [new HotReloadPlugin()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // plugins: [new TsconfigPathsPlugin({ configFile: path.resolve('./src/client/tsconfig.json') })],
    tsConfig: { configFile: path.resolve('./src/client/tsconfig.json') },
  },
  output: {
    path: path.resolve('./build'),
    filename: 'client.js',
  },
});
