'use strict';

const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  entry: {
    app: `${__dirname}/../src/index.js`,
    vendor: ['aframe', 'd3']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/../src/index.html`,
      inject: false
    }),
    new ExtractTextPlugin('index.css'),
    new CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],
};
