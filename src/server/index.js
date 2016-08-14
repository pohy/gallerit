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
    const subreddits = (req.query.subreddits || '').split(/[,; ]/);
    const sorting = req.query.sorting || 'hot';
    const nsfw = req.query.sorting || false;
    if (!subreddits.length) {
        res.status(400).json({
            message: '"subreddits" query parameter is mandatory'
        });
    }
    getAccessToken()
        .then((token) => {
            const postPromises = subreddits.map((subreddit) =>
                fetchSubredditPosts(token, subreddit, sorting, nsfw)
            );
            return Promise
                .all(postPromises)
                .then(results =>
                    results.reduce((posts, post) => posts.concat(post), [])
                );
        })
        .then(posts => res.json(posts));
});

function fetchSubredditPosts(token, subreddit, sorting, nsfw) {
    return new Promise((resolve, reject) =>
        request.get(`https://oauth.reddit.com/r/${subreddit}/${sorting}.json`, {
            headers: {
                'Authorization': `Bearer ${token.token}`,
                'User-Agent': 'web:cz.pohy.gallerit:1.0.0 (by /u/pohy)'
            }
        }, (err, response, bodyRaw) => {
            if (err) {
                reject(err);
            }
            const body = JSON.parse(bodyRaw);
            const posts = body.data.children
                .filter(post => !post.data['is_self'])
                .filter(post => nsfw ? true : !post.data['nsfw'])
                .map(post => ({
                    url: post.data.url,
                    title: post.data.title
                }))
                // TODO: Implement WEBM support
                .filter(post => /(png|jpg|jpeg|gif)/g.test(post.url));
            resolve(posts);
        })
    );
}

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
