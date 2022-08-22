const path = require('path');
const glob = require("glob");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

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
  entry: glob.sync('spec/test.spec.[jt]s?(x)'),
  mode,
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    fallback: {
      'fs': require.resolve('browserify-fs')
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: loaders
  },
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};