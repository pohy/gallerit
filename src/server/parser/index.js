const Promise = require('promise');

module.exports = {
    parseImages
};

const parsers = [
    require('./default')
];

function parseImages(post) {
    return new Promise((resolve) => {
        let parserPointer = -1;
        next();

        function next() {
            parserPointer++;
            if (parserPointer >= parsers.length) {
                resolve(undefined);
                return;
            }
            parsers[parserPointer]
                .parseImages(post)
                .then(resolve)
                .catch(next);
        }
    });
}
