const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: './.env' }); 

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src', 'index.tsx'),
      path.resolve(__dirname, 'src', 'app/index.scss'),
    ],
  },
  context: path.join(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.css$/, loader: 'css-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
          @import "app/variables.scss";
          @import "app/colors.scss";
          @import "app/mixins.scss";
        `,
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      ENV_VARS: JSON.stringify(process.env),
    }),
  ],
  devServer: {
    port: 4000,
    compress: true,
    historyApiFallback: true,
  },
};
