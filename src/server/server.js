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
    const subreddits = (req.query.subreddits || '').replace(/[;,\s]+/g, ',').split(',');
    const sorting = req.query.sorting || 'hot';
    const nsfw = req.query.nsfw === 'true';
    if (!subreddits.length) {
        return res.status(400).json({
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
        return res.status(400).json({
            message: '"positions" object is required'
        });
    }
    reddit
        .fetchMoreImages(positions, sorting, nsfw)
        .then((posts) => res.json(posts))
        .catch(next);
});

app.get('/thumbnail', (req, res, next) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({
            message: '"url" query parameter is mandatory'
        });
    }
    util
        .createThumbnail(url)
        .then((thumbnail) => res
            .set('Content-Type', `image/${thumbnail.metadata.format}`)
            .send(thumbnail.thumbnail)
        )
        .catch(next);
});

module.exports = app;
