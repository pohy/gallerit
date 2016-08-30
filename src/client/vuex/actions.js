import * as types from './mutationTypes';

const apiUrl = `${location.protocol}//localhost:3000/api`;

// for some reason, exporting multiple consts exports an undefined
export default {
    loadImages,
    loadMore,
    updateForm,
    toggleSlideshow,
    toggleFullscreen
};

function loadImages({commit, state: {form: {subreddits, sorting, nsfw}}}) {
    commit(types.LOAD_IMAGES_START);
    // TODO: remove the hardcoded URL
    fetch(apiUrl
        + `?subreddits=${subreddits.replace(/\s/g, '')}`
        + `&sorting=${sorting}`
        + `&nsfw=${nsfw}`
    )
        .then((res) => res.json())
        .then((subreddits) => commit(types.LOAD_IMAGES_SUCCESS, {subreddits}))
        .catch(() => commit(types.LOAD_IMAGES_FAIL));
}

function loadMore({commit, state: {positions, form: {sorting, nsfw}}}) {
    commit(types.LOAD_MORE_START);
    fetch(`${apiUrl}/more`, {
        method: 'POST',
        body: JSON.stringify({positions, sorting, nsfw}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((subreddits) => commit(types.LOAD_MORE_SUCCESS, {subreddits}))
        .catch(() => commit(types.LOAD_MORE_FAIL));
}

function updateForm({commit}, {target: {name, value, type, checked}}) {
    commit(types.UPDATE_FORM, {
        name,
        value: normalizeInput(type, value)
    });

    function normalizeInput(type, value) {
        switch (type) {
            case 'checkbox':
                return checked;
            default:
                return value;
        }
    }
}

function toggleSlideshow({commit}, value) {
    commit(types.TOGGLE_SLIDESHOW, value);
}

function toggleFullscreen({commit}, value) {
    commit(types.TOGGLE_FULLSCREEN, value);
}
