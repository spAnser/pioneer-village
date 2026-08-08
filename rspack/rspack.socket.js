const path = require('path');

// @ts-check
/** @type {import('@rspack/cli').Configuration} */
module.exports = () => ({
  name: 'socket',
  entry: path.resolve('./src/socket.ts'),
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
  externalsPresets: {
    node: true,
  },
  externalsType: 'commonjs',
  externals: [/^[a-z@][^!?:]*$/],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    tsConfig: { configFile: path.resolve('./src/tsconfig.json') },
  },
  output: {
    path: path.resolve('./build'),
    filename: 'socket.js',
  },
  target: 'node',
});
