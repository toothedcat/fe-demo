var webpack = require('webpack');
var path = require('path');

const md = require('markdown-it')('default');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractLESSPlugin = new ExtractTextPlugin('/docs.css');

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.less$/,
                loader: extractLESSPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.md/,
                loader: 'vue-markdown-loader',
                options: md
            }
        ]
    }
}