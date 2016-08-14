import * as types from './mutationTypes';

export const loadImages = ({dispatch, state: {form: {subreddits, sorting, nsfw}}}) => {
    dispatch(types.LOAD_IMAGES_START);
    // TODO: remove the hardcoded URL
    fetch('http://localhost:3000'
        + `?subreddits=${subreddits.replace(/\s/g, '')}`
        + `&sorting=${sorting}`
        + `&nsfw=${nsfw}`
    )
        .then((res) => res.json())
        .then((images) => dispatch(types.LOAD_IMAGES_SUCCESS, images))
        .catch(() => dispatch(types.LOAD_IMAGES_FAIL));
};

export const updateForm = ({dispatch}, {target: {name, value}}) => {
    dispatch(types.UPDATE_FORM, name, value);
};