const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist')
    },
    plugins:
        [
        new htmlWebpackPlugin(
            {
                filename: 'index.html',
                template: './src/index.html',
                alwaysWriteToDisk: true,
              }
            )
       ]
};