const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Build mode
const mode = 'development';

const loaders = [
  {
    test: /\.html$/i,
    loader: "html-loader",
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  },
  // {
  //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //   type: 'asset/resource',
  // },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"],
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: ["ts-loader"],
  },
];

module.exports = {
  mode,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: loaders
  },
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};