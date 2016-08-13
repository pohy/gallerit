const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.json([{
        url: 'http://localhost:3000/image.jpg',
        title: 'ImageCard'
    }, {
        url: 'http://localhost:3000/image.jpg',
        title: 'ImageCard'
    }, {
        url: 'http://localhost:3000/image.jpg',
        title: 'ImageCard'
    }, {
        url: 'http://localhost:3000/image.jpg',
        title: 'ImageCard'
    }, {
        url: 'http://localhost:3000/image.jpg',
        title: 'ImageCard'
    }, ]);
});

app.listen(3000, () => console.log('API listening on port 3000'));
