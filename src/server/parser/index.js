const Promise = require('promise');

module.exports = {
    parseImages
};

const parsers = [
    require('./default')
];

function parseImages(url, defaultTitle) {
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
                .parseImages(url, defaultTitle)
                .then(resolve)
                .catch(next);
        }
    });
}
