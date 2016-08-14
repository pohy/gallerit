const Promise = require('promise');
const request = require('request');

const config = require('./config.js');

module.exports = {
    fetchSubredditPosts: fetchSubredditPosts,
    getAccessToken: getAccessToken
};

let accessToken = {
    token: undefined,
    expiration: Date.now()
};

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
            const imageRegex = /(png|jpg|jpeg|gif)$/g;
            const videoRegex = /(webm|mp4)$/g;
            const posts = body.data.children
                .filter(post => !post.data['is_self'])
                .filter(post => nsfw ? true : !post.data['nsfw'])
                .map(post => ({
                    url: post.data.url,
                    title: post.data.title,
                    type: getType(post.data.url)
                }))
                // TODO: Implement WEBM support
                .filter(post => ['video', 'image'].indexOf(post.type) > -1);
            resolve(posts);

            function getType(url) {
                if (videoRegex.test(url)) {
                    return 'video';
                }
                if (imageRegex.test(url)) {
                    return 'image';
                }
                return 'unknown';
            }
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
