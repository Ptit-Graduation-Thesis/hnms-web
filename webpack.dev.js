/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin({ multistep: true }),
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    progress: true,
    hot: true,
    historyApiFallback: true,
    watchContentBase: true,
    quiet: true,
    watchOptions: {
      poll: true,
      aggregateTimeout: 300,
      ignored: [
        `${__dirname}/node_modules`,
      ],
    },
  },
  devtool: 'inline-source-map',
})
