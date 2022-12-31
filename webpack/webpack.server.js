const path = require('path');
const HotReloadPlugin = require('./webpack.hot-reload');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => ({
  entry: path.resolve('./src/server/server.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /build/],
        loader: 'ts-loader',
      },
    ],
  },
  externalsPresets: {
    node: true,
  },
  plugins: [new HotReloadPlugin()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve('./src/server/tsconfig.json') })],
  },
  output: {
    path: path.resolve('./build'),
    filename: 'server.js',
  },
  target: 'node',
});
