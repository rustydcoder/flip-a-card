const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: "./src/game.js",
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },

   devServer: {
      contentBase: "./dist"
   },

   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: path.resolve(__dirname, 'src', 'index.html')
      }),
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css',
         ignoreOrder: false
      })
   ],

   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader'
            ]
         },
         {
            test: /\.png$/,
            use: {
               loader: 'url-loader',
               options: 'images/[hash].[ext]'
            }
         }
      ]
   }
}