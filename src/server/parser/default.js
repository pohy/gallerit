const Promise = require('promise');

const util = require('../util');

module.exports = {
    parseImages
};

function parseImages(url, defaultTitle) {
    return new Promise((resolve, reject) => {
        const type = getType(url);
        if (!type) {
            reject(url);
            return;
        }
        // always a single image, hence the array wrapping
        resolve([
            util.createImageObject(url, defaultTitle, type)
        ]);
    });
}

function getType(url) {
    if (/(webm|mp4)$/.test(url)) {
        return 'video';
    }
    if (/(png|jpg|jpeg|gif)$/.test(url)) {
        return 'image';
    }
    return undefined;
}
