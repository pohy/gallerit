const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const clientRoot = `${__dirname}/src/gallerit`;

module.exports = {
    entry: isProduction ? `${clientRoot}/src/index.js` : [
        'webpack-hot-middleware/client',
        `${clientRoot}/src/index.js`
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: isProduction ? '#cheap-source-map' : '#eval-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.css$/,
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
                }
            ]
        }]
    },
    plugins: getPlugins()
};

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

