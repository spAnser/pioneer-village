const path = require('path');
const HotReloadPlugin = require('./webpack.hot-reload');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => ({
  entry: path.resolve('./src/ui/ui.ts'),
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /build/],
        loader: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['preact-svg-loader'],
      },
    ],
  },
  plugins: [new HotReloadPlugin()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve('./src/ui/tsconfig.json') })],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  output: {
    path: path.resolve('./build'),
    filename: 'ui.js',
  },
});
