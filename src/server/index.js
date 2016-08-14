const express = require('express');
const request = require('request');
const Promise = require('promise');
const lodash = require('lodash');

const config = require('./config.js');

const app = express();

let accessToken = {
    token: undefined,
    expiration: Date.now()
};

app.use((req, res, next) => {
    // Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set User-Agent according to reddit's rules
    req.header('User-Agent', 'web:cz.pohy.gallerit:1.0.0 (by /u/pohy)')

    next();
});
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
    getAccessToken()
        .then((token) => {
            request.get('https://oauth.reddit.com/r/pics/hot.json', {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'User-Agent': 'web:cz.pohy.gallerit:1.0.0 (by /u/pohy)'
                }
            }, (err, response, bodyRaw) => {
                if (err) {
                    next(err);
                }
                const body= JSON.parse(bodyRaw);
                const posts = lodash(body.data.children)
                    .filter(post => !post.data['is_self'])
                    // Filter NSFW posts
                    .map(post => ({
                        url: post.data.url,
                        title: post.data.title
                    }))
                    .filter(post => /(png|jpg|jpeg|gif)/g.test(post.url))
                    .value();
                res.json(posts);
            });
        });
});

function getAccessToken() {
    return new Promise((resolve, reject) => {
        if (Date.now() >= accessToken.expiration) {
            requestAccessToken()
                .then((res) => {
                    accessToken.token = res['access_token'];
                    accessToken.expiration = Date.now() + res['expires_in'];
                    resolve(accessToken);
                })
                .catch(reject);
        } else {
            resolve(accessToken);
        }
    });

    function requestAccessToken() {
        const encodedAuth = new Buffer(`${config.clientId}:${config.clientSecret}`).toString('base64');
        return new Promise((resolve, reject) =>
            request.post('https://ssl.reddit.com/api/v1/access_token', {
                form: {
                    'grant_type': 'client_credentials'
                },
                headers: {
                    'Authorization': `Basic ${encodedAuth}`
                }
            }, (err, res, body) =>
                err ? reject(err) : resolve(JSON.parse(body))
            )
        );
    }
}

app.listen(3000, () => console.log('API listening on port 3000'));
