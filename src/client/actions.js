import * as types from './mutationTypes';

const apiUrl = 'http://localhost:3000';

export const loadImages = ({dispatch, state: {form: {subreddits, sorting, nsfw}}}) => {
    dispatch(types.LOAD_IMAGES_START);
    // TODO: remove the hardcoded URL
    fetch(apiUrl
        + `?subreddits=${subreddits.replace(/\s/g, '')}`
        + `&sorting=${sorting}`
        + `&nsfw=${nsfw}`
    )
        .then((res) => res.json())
        .then((subreddits) => dispatch(types.LOAD_IMAGES_SUCCESS, subreddits))
        .catch(() => dispatch(types.LOAD_IMAGES_FAIL));
};

export const loadMore = ({dispatch, state: {positions, form: {sorting, nsfw}}}) => {
    dispatch(types.LOAD_MORE_START);
    fetch(`${apiUrl}/more`, {
        method: 'POST',
        body: JSON.stringify({positions, sorting, nsfw}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((subreddits) => dispatch(types.LOAD_MORE_SUCCESS, subreddits))
        .catch(() => dispatch(types.LOAD_MORE_FAIL));
};

export const updateForm = ({dispatch}, {target: {name, value, type, checked}}) => {
    dispatch(types.UPDATE_FORM, name, normalizeInput(type, value));

    function normalizeInput(type, value) {
        switch (type) {
            case 'checkbox':
                return checked;
            default:
                return value;
        }
    }
};