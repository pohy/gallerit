const Promise = require('promise');
const request = require('request');

const config = require('./config.js');
const parser = require('./parser');
const util = require('./util');

module.exports = {
    fetchSubredditsImages,
    fetchMoreImages
};

let accessToken = {
    token: undefined,
    expiration: Date.now()
};

function fetchMoreImages(positions, sorting, nsfw) {
    return new Promise((resolve, reject) => {
        const postPromises = Object.keys(positions).map((subreddit) =>
            fetchSubredditPosts(subreddit, sorting, nsfw, positions[subreddit])
        );
        resolvePostPromises(postPromises)
            .then(resolve)
            .catch(reject);
    });
}

function fetchSubredditsImages(subreddits, sorting, nsfw) {
    return new Promise((resolve, reject) => {
        const postPromises = subreddits.map((subreddit) =>
            fetchSubredditPosts(subreddit, sorting, nsfw)
        );
        resolvePostPromises(postPromises)
            .then(resolve)
            .catch(reject);
    });
}

function resolvePostPromises(promises) {
    return Promise
        .all(promises)
        // TODO: handle promise failures
        .then(mapPosts);
}

function mapPosts(posts) {
    return posts.reduce((result, {images, position, subreddit}) => {
        result[subreddit] = {images, position};
        return result;
    }, {});
}

function fetchSubredditPosts(subreddit, sorting, nsfw, after) {
    const afterParam = after ? `?after=${after}` : '';
    return new Promise((resolve, reject) =>
        getAccessToken()
            .then((token) =>
                request.get(`https://oauth.reddit.com/r/${subreddit}/${sorting}.json${afterParam}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                        'User-Agent': 'web:cz.pohy.gallerit:1.0.0 (by /u/pohy)'
                    }
                }, (err, response, bodyRaw) =>
                    parseBody(err, response, bodyRaw)
                        .then((body) => {
                            const parserPromises = body.data.children
                                .filter((post) => nsfw ? true : !post.data['over_18'])
                                .map((post, i, posts) => parser.parseImages(post.data.url, post.data.title));
                            Promise
                                .all(parserPromises)
                                .then((images) => ({
                                    images: util.flatten(
                                        images.filter(image => !!image)
                                    ),
                                    position: body.data.after,
                                    subreddit
                                }))
                                .then(resolve)
                                .catch(reject);
                        })
                        .catch(reject)
                )
            )
    );
}

function parseBody(err, response, bodyRaw) {
    return new Promise((resolve, reject) => {
        if (err || response.statusCode > 201) {
            reject(err ? err : bodyRaw);
        }
        let body;
        try {
            body = JSON.parse(bodyRaw);
        } catch (err) {
            reject(err);
            return;
        }
        if (!body.data || !body.data.children) {
            reject(body);
            return;
        }
        resolve(body);
    });
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
