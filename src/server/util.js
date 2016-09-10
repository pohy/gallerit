module.exports = {
    flatten,
    createImageObject
};

function flatten(array) {
    return array.reduce((result, arr) =>
        result.concat(Array.isArray(arr) ? flatten(arr) : arr)
    , []);
}

function createImageObject(url, title, type) {
    return {
        url,
        title,
        type
    };
}
