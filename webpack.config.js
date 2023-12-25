const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
//const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? false : 'source-map',
        watch: !isProduction,
        entry: ['./src/index.js', './src/sass/style.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            assetModuleFilename: 'img/[name][ext]'
        },
        optimization: {
          minimize: false,
        }, 

        module: {
          rules: [
            {
              test: /\.(?:js|mjs|cjs)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                  
                }
              }
            },
             {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader",
                  options: { 
                    minimize: isProduction 
                  }
              }
            ]   
            },{
              test: /\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
              ]
            }, 
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
          ]
        },

        plugins: [
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            template: './public/index.html', 
            filename: 'index.html', 
            chunks: ['main'] 
          }),
          new HtmlWebpackPlugin({
            template: './public/heroes.html', 
            filename: 'heroes.html', 
            chunks: ['main'] 
          }),

          new MiniCssExtractPlugin({
            filename: 'style.css',
          }),
      ]
    }

    return config;

};
