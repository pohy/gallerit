const express = require('express');
const app = express.Router();

const reddit = require('./reddit');
const util = require('./util');

app.use((req, res, next) => {
    // Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(`${__dirname}/static`));

app.get('/', (req, res, next) => {
    const subreddits = (req.query.subreddits || '').split(/[,; ]/);
    const sorting = req.query.sorting || 'hot';
    const nsfw = req.query.nsfw === 'true';
    if (!subreddits.length) {
        res.status(400).json({
            message: '"subreddits" query parameter is mandatory'
        });
    }
    reddit
        .fetchSubredditsImages(subreddits, sorting, nsfw)
        .then((posts) => res.json(posts))
        .catch(next);
});

app.post('/more', (req, res, next) => {
    const positions = req.body.positions;
    const sorting = req.body.sorting || 'hot';
    const nsfw = req.body.nsfw === 'true';
    if (!positions) {
        res.status(400).json({
            message: '"positions" object is required'
        });
    }
    reddit
        .fetchMoreImages(positions, sorting, nsfw)
        .then((posts) => res.json(posts))
        .catch(next);
});

module.exports = app;
