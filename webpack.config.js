const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/main.ts']
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            { test: /\.html$/, use: [{ loader: 'html-loader' }] },
            { test: /\.tsx?$/, use: [{ loader: 'awesome-typescript-loader' }] },
            {
                test: /\.scss$/, use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                })
            },
            { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, use: 'file-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: __dirname + '/src/index.html',
        })
    ],
    devtool: 'source-map'
};