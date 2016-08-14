import * as types from './mutationTypes';

export const loadImages = ({dispatch}, subreddits) => {
    dispatch(types.LOAD_IMAGES_START);
    // TODO: remove the hardcoded URL
    fetch(`http://localhost:3000?subreddits=${subreddits.replace(' ', '')}`)
        .then((res) => res.json())
        .then((images) => dispatch(types.LOAD_IMAGES_SUCCESS, images))
        .catch(() => dispatch(types.LOAD_IMAGES_FAIL));
};