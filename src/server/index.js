const express = require('express');
const Promise = require('promise');

const reddit = require('./reddit');
const util = require('./util');

const app = express();

app.use((req, res, next) => {
    // Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
    const subreddits = (req.query.subreddits || '').split(/[,; ]/);
    const sorting = req.query.sorting || 'hot';
    const nsfw = req.query.nsfw === 'true';
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
                .then(util.flatten);
        })
        .then(posts => res.json(posts))
        .catch(next);
});

app.listen(3000, () => console.log('API listening on port 3000'));
