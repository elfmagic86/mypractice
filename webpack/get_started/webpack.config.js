
var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PracticeLogPlugin = require('./PracticeLogPlugin.js');


module.exports = {
  entry: {
    polyfill: './src/polyfill.js',
    vendor: './src/vendor.js',
    app: './src/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['bundle', 'vendor', 'polyfill'], minChunks: Infinity }),
    new HtmlWebpackPlugin({
      filename: 'dist/index.html',  // genarated default conf
    }),

    new PracticeLogPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {modules: false}]],
            plugins: [
              'syntax-dynamic-import',
              'transform-async-to-generator',
              'transform-regenerator',
              'transform-runtime',
            ]
          }
        }]
      },
    ]
  }
};
