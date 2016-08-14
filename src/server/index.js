const express = require('express');
const request = require('request');
const Promise = require('promise');
const lodash = require('lodash');

const config = require('./config.js');
const reddit = require('./reddit');

const app = express();

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
    reddit.getAccessToken()
        .then((token) => {
            const postPromises = subreddits.map((subreddit) =>
                reddit.fetchSubredditPosts(token, subreddit, sorting, nsfw)
            );
            return Promise
                .all(postPromises)
                // TODO: handle promise failures
                .then(results =>
                    results.reduce((posts, post) => posts.concat(post), [])
                );
        })
        .then(posts => res.json(posts));
});

app.listen(3000, () => console.log('API listening on port 3000'));
