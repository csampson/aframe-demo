'use strict';

const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

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
        loaders: ['babel'],
        publicPath: '/js'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=images/[name].[hash].[ext]&limit=1000'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.js$/,
        loader: 'html'
      }
    ]
  },
  output: {
    path: `${__dirname}/../public`,
    publicPath: '/public',
    filename: 'js/bundle-[hash].js'
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new CommonsChunkPlugin('vendor', 'js/vendor.bundle-[hash].js')
  ],
};
