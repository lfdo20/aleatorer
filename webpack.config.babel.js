const webpack = require('webpack');
// const join = require('path');
import {join} from 'path';
const include = join(__dirname, 'src');


module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: {
    filename: './src/index.js',
  },
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'aleatorer',
    // filename: './dist/build.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', {modules: false}],
          ],
        },
        include,
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: true,
    }),
  ],
};
