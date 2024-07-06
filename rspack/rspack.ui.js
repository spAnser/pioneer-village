const path = require('path');
const HotReloadPlugin = require('./rspack.hot-reload');
const { ProvidePlugin } = require('@rspack/core');

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
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2017',
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
        },
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
  plugins: [
    new HotReloadPlugin('ui'),
    new ProvidePlugin({ h: ['preact', 'h'], Fragment: ['preact/compat', 'Fragment'] }),
  ],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    tsConfig: { configFile: path.resolve('./src/ui/tsconfig.json') },
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
