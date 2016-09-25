const Promise = require('promise');

const util = require('../util');
const {host} = require('./../config');

module.exports = {
    parseImages
};

function parseImages({data: {url, title}}) {
    return new Promise((resolve, reject) => {
        const type = getType(url);
        if (!type) {
            reject(url);
            return;
        }
        const thumbnail = type === 'image' ? `${host}/api/thumbnail?url=${url}` : undefined;
        // always a single image, hence the array wrapping
        resolve([
            util.createImageObject(url, title, type, thumbnail)
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
