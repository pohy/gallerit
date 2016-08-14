const Promise = require('promise');

const util = require('../util');

module.exports = {
    parseImages
};

const imageRegex = /(png|jpg|jpeg|gif)$/g;
const videoRegex = /(webm|mp4)$/g;

function parseImages(url, defaultTitle) {
    return new Promise((resolve, reject) => {
        const type = getType(url);
        if (!type) {
            reject(url);
        }
        // always a single image, hence the array wrapping
        resolve([
            util.createImageObject(url, defaultTitle, type)
        ]);
    });
}

function getType(url) {
    if (videoRegex.test(url)) {
        return 'video';
    }
    if (imageRegex.test(url)) {
        return 'image';
    }
    return undefined;
}
