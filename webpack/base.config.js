const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
            test: /\.(mp3|wav|wma|ogg)$/i,
            loader: "file-loader",
        },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
        WEBGL_RENDERER: true,
        CANVAS_RENDERER: true
      }),
    new HtmlWebpackPlugin(
        { gameName: 'Cooking for the king', template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      { from: 'src/favicon.ico', to: '' }
    ])
  ]
}
