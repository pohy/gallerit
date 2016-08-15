import * as types from './mutationTypes';

export default {
    [types.LOAD_IMAGES_START](state) {
        state.images = [];
        state.loading = true;
        state.fail = false;
    },
    [types.LOAD_IMAGES_SUCCESS](state, {subreddits}) {
        handleFetchedSubreddits(state, subreddits)
    },
    [types.LOAD_IMAGES_FAIL](state) {
        state.loading = false;
        state.fail = true;
    },
    [types.UPDATE_FORM](state, {name, value}) {
        state.form[name] = value;
    },
    [types.LOAD_MORE_START](state) {
        state.loading = true;
    },
    [types.LOAD_MORE_SUCCESS](state, {subreddits}) {
        handleFetchedSubreddits(state, subreddits, /* append */ true)
    },
    [types.LOAD_MORE_FAIL](state) {
        state.loading = false;
    },
    ['router/ROUTE_CHANGED'](state, {query: {subreddits, sorting, nsfw}}) {
        const {form} = state;
        state.form = {
            subreddits: subreddits || form.subreddits,
            sorting: sorting || form.sorting,
            nsfw: (nsfw && typeof nsfw === 'boolean' ? nsfw : nsfw === 'true') || form.nsfw
        };
    }
};

function handleFetchedSubreddits(state, subreddits, append) {
    const images = Object
        .keys(subreddits)
        .map((subreddit) => subreddits[subreddit].images)
        .reduce((result, images) => result.concat(images), []);
    if (append) {
        state.images = removeDuplicates(state.images.concat(images));
    } else {
        state.images = images;
    }
    state.positions = Object
        .keys(subreddits)
        .reduce((positions, subreddit) => {
            positions[subreddit] = subreddits[subreddit].position;
            return positions;
        }, {});
    state.loading = false;
    state.fail = false;

    // TODO: implement tests for this method
    function removeDuplicates(images) {
        let foundUrls = [];
        return images.filter((image) => {
            if (foundUrls.indexOf(image.url) > -1) {
                return false;
            } else {
                foundUrls.push(image.url);
                return true;
            }
        })
    }
}
