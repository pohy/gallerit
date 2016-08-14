import * as types from './mutationTypes';

export const loadImages = ({dispatch}, subreddits, sorting, nsfw) => {
    dispatch(types.LOAD_IMAGES_START);
    // TODO: remove the hardcoded URL
    fetch('http://localhost:3000'
        + `?subreddits=${subreddits.replace(' ', '')}`
        + `&sorting=${sorting}`
        + `&nsfw=${nsfw}`
    )
        .then((res) => res.json())
        .then((images) => dispatch(types.LOAD_IMAGES_SUCCESS, images))
        .catch(() => dispatch(types.LOAD_IMAGES_FAIL));
};