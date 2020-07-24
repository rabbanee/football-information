const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, "docs"),
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

        new WebpackPwaManifest({
            filename: "manifest.json",
            name: 'Football Information - FI',
            short_name: 'Football Information',
            description: 'App about Football Information',
            background_color: '#ffffff',
            start_url: "/",
            display: "standalone",
            theme_color: "#EE6E73",
            icons: [
                {
                    src: path.resolve(__dirname, 'src/img/ball_bg.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple szes
                    destination: path.join('src/img', 'android'),
                },
                {
                    src: path.resolve('src/img/ball_bg.png'),
                    sizes: [120, 152, 167, 180, 1024],
                    destination: path.join('src/img', 'ios'),
                    ios: true
                },
            ],
            includeDirectory: true,
            gcm_sender_id: "496418037762",
            publicKey: "BOml4-PG4mZ2RTyTBRQ1hPNy8SMhVJwMhu2rX94V_Yvv-wSHp7Rmacxo76Y51cQ1GJgLBJJlxlZTOBcfwTPtrgc",
            privateKey: "VQqnVIADCk3Q_E7XJ_Uids4jVeTzLz0efK5YdfqyElk"
        }),

        new MomentLocalesPlugin(),

        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'sw.js'),
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'public/src/img'),
                },
                // {
                //     from: path.resolve(__dirname, 'docs/manifest.json'),
                //     to: path.resolve(__dirname, 'manifest.json'),
                // },
            ]
        }),
    ]
}