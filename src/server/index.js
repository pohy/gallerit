const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const api = require('./server');

const isProduction = process.env.NODE_ENV === 'production';
console.log('production', isProduction)

const webpackConfig = require('./../../webpack.config.js');
const webpackOptions = {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src/client',
    stats: {
        colors: true,
        hash: true,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
};

const address = '0.0.0.0';
const defaultPort = 3000;
const port = isProduction ? process.env.PORT || defaultPort : defaultPort;
const indexLocation = `${__dirname}/../../dist/index.html`;

const app = express();
app.use(bodyParser.json());
app.use(compression());

app.use('/api', api);

if (isProduction) {
    app.use(express.static(path.join(__dirname, '../../dist')));
    app.get('*', (req, res) =>
        res.sendFile(indexLocation)
    );
} else {
    const compiler = webpack(webpackConfig);
    const webpackMiddleware = webpackDevMiddleware(compiler, webpackOptions);

    app.use(webpackMiddleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', (req, res) => {
        res.write(webpackMiddleware.fileSystem.readFileSync(indexLocation));
        res.end();
    });
}

app.listen(port, address, (error) =>
    error
        ? console.error(error)
        : console.log(`Listening on ${address}:${port}`)
);
