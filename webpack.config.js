const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: [
        path.join(__dirname, 'src/client/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    vue: {
        loaders: {
            'scss': 'vue-style!css!sass'
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(scss|sass)$/,
                loader: 'style!css!sass'
            }
        ]
    },
    devtool: '#eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/client/index.html'),
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            'window.Tether': 'tether'
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
} else {
    config.entry = ['webpack-hot-middleware/client?reload=true'].concat(config.entry);
    config.devServer = {
        historyApiFallback: true,
        noInfo: true
    };
    config.plugins = config.plugins.concat([
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ]);
}

module.exports = config;
