const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'phaser-start',
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i, 
        use: [
          {
            loader: 'file-loader',
            options: {
                outputPath: 'images', 
                name: '[name].[ext]', 
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                outputPath: 'assets/music',
                name: '[name].[ext]',
            }
          }
        ]
      }
    ]
  },
};  