const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        }
    },
    node: {
        tls: 'empty',
        net: 'empty'
    },
    // Module
    module: {
        rules: [
            {
                test: /\.handlebars$/,
                loader: 'text-loader'
            },
            // Style and css loader
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|png|jpe?|svg)$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]

    },
    //Plugins
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'Football Information &mdash; FI',
                template: "./src/html/app.ejs",
            }
        ),
        new MomentLocalesPlugin(),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'sw.js'),
        }),
    ]
}