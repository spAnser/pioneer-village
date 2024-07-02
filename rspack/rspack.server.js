const path = require('path');
const HotReloadPlugin = require('./rspack.hot-reload');

module.exports = () => ({
  entry: path.resolve('./src/server/server.ts'),
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
  externalsPresets: {
    node: true,
  },
  plugins: [new HotReloadPlugin()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    tsConfig: { configFile: path.resolve('./src/server/tsconfig.json') },
  },
  output: {
    path: path.resolve('./build'),
    filename: 'server.js',
  },
  target: 'node',
});
