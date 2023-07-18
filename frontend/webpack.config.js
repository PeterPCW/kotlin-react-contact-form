const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    mode: isProduction ? 'production' : 'development',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'] },
        { test: /\.tsx$/, 
          exclude: /node_modules/,
          use: 'ts-loader' },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './public/manifest.json', to: 'manifest.json' },
          { from: './public/byte+bit.png', to: 'byte+bit.png' }
        ],
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
