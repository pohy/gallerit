const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const clientRoot = `${__dirname}/src/prototype`;

module.exports = {
    entry: getEntry(),
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: isProduction ? '#cheap-source-map' : '#eval-source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                    // plugins: ['mobx-deep-action']
                }
            }
        }, {
            test: /\.(scss|sass|css)$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: () => [
                            autoprefixer()
                        ]
                    }
                },
                'sass-loader'
            ]
        }]
    },
    plugins: getPlugins()
};

function getEntry() {
    const indexLocation = `${clientRoot}/index.js`;
    const base = ['babel-polyfill'];
    const production = [indexLocation];
    const dev = [
        'webpack-hot-middleware/client',
        indexLocation
    ];
    return isProduction ? base.concat(production) : base.concat(dev);
}

function getPlugins() {
    const base = [
        new HtmlWebpackPlugin({
            template: `${clientRoot}/public/index.html`
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ];
    const dev = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ];
    const production = [];
    return isProduction ? base.concat(production) : base.concat(dev);
}

