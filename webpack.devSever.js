const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { PATHS } = require('./config/path');

module.exports = merge(commonConfig, {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/public'),
    },
    hot: true,
    port: 3000,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true
      }
    }
  },
});
