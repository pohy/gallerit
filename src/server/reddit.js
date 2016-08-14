const Promise = require('promise');
const request = require('request');

const config = require('./config.js');
const parser = require('./parser');
const util = require('./util');

module.exports = {
    fetchSubredditsImages,
};

let accessToken = {
    token: undefined,
    expiration: Date.now()
};

function fetchSubredditsImages(subreddits, sorting, nsfw) {
    return new Promise((resolve, reject) => {
        getAccessToken()
            .then((token) => {
                const postPromises = subreddits.map((subreddit) =>
                    fetchSubredditPosts(token, subreddit, sorting, nsfw)
                );
                return Promise
                    .all(postPromises)
                    // TODO: handle promise failures
                    .then((posts) => posts.reduce((result, {images, position, subreddit}) => {
                        result[subreddit] = {images, position};
                        return result;
                    }, {}));
            })
            .then(resolve)
            .catch(reject);
    })
}

function fetchSubredditPosts(token, subreddit, sorting, nsfw) {
    return new Promise((resolve, reject) =>
        request.get(`https://oauth.reddit.com/r/${subreddit}/${sorting}.json`, {
            headers: {
                'Authorization': `Bearer ${token.token}`,
                'User-Agent': 'web:cz.pohy.gallerit:1.0.0 (by /u/pohy)'
            }
        }, (err, response, bodyRaw) => {
            if (err || response.statusCode > 201) {
                reject(err ? err : bodyRaw);
            }
            const body = JSON.parse(bodyRaw);
            const parserPromises = body.data.children
                .filter((post) => nsfw ? true : !post.data['over_18'])
                .map((post, i, posts) => parser.parseImages(post.data.url, post.data.title));
            Promise
                .all(parserPromises)
                .then((images) => resolve(
                    util.flatten(
                        images.filter(image => !!image)
                    )
                ))
                .catch(reject);
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