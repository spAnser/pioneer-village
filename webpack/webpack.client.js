const path = require('path');
const HotReloadPlugin = require('./webpack.hot-reload');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => ({
  entry: path.resolve('./src/client/client.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /build/],
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new HotReloadPlugin()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve('./src/client/tsconfig.json') })],
  },
  output: {
    path: path.resolve('./build'),
    filename: 'client.js',
  },
});
