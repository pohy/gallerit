const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const clientRoot = `${__dirname}/src/gallerit`;

module.exports = {
    entry: isProduction ? `${clientRoot}/src/index.js` : [
        'webpack-hot-middleware/client',
        `${clientRoot}/src/index.js`
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js'
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
    plugins: [
        new HtmlWebpackPlugin({
            template: `${clientRoot}/public/index.html`
        })
    ]
};

