const sharp = require('sharp');
const request = require('request');
const Promise = require('promise');

module.exports = {
    flatten,
    createImageObject,
    createThumbnail
};

function flatten(array) {
    return array.reduce((result, arr) =>
        result.concat(Array.isArray(arr) ? flatten(arr) : arr)
    , []);
}

function createImageObject(url, title, type, thumbnail) {
    return {
        url,
        title,
        type,
        thumbnail
    };
}

const resizeWidth = 300;
function createThumbnail(url) {
    return new Promise((resolve, reject) =>
        request.get(url, {encoding: null}, (err, response, bodyRaw) => {
            if (err) {
                return reject(err);
            }
            const image = sharp(bodyRaw);
            image
                .metadata()
                .then((metadata) =>
                    image
                        .resize(resizeWidth)
                        .toBuffer()
                        .then((thumbnail) => resolve({
                            metadata,
                            thumbnail
                        }))
                )
                .catch(reject);
        })
    );
}
