const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: ['babel-polyfill', './todo/static/js/index.jsx'],
    output: {
        path: path.join(__dirname, '/assets/bundles/'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[name]__[hash:base64:5]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new BundleTracker({
            filename: 'webpack_stats.json',
        })
    ]
}