export {
    fetchPosts
};

async function fetchPosts(options, SEARCH_OPTIONS) {
    const {NSFW, SORTING, SUBREDDITS} = SEARCH_OPTIONS;
    const query =
        prefix('?', pair(SUBREDDITS))
        + prefix('&', pair(SORTING))
        + prefix('&', pair(NSFW));
    try {
        const response = await fetch(`/api/${query}`);
        const posts = await response.json();
        if (response.status >= 500) {
            throw new Error(posts);
        }
        return {
            images: imagesFromPosts(posts),
            positions: subredditPositions(posts)
        }
    } catch (error) {
        console.error(error);
        this.setState({failed: true});
    }

    function prefix(prefix, value) {
        return !!value ? `${prefix}${value}` : '';
    }

    function pair(option) {
        const optionValue = `${options[option]}`;
        return !!optionValue
            ? `${option}=${optionValue}`
            : '';
    }
}

function imagesFromPosts(posts) {
    return Object
        .keys(posts)
        .reduce(reducePosts(posts), []);
}

function subredditPositions(images) {
    Object
        .keys(images)
        .reduce(
            (positions, subreddit) => ({
                ...positions,
                [subreddit]: images[subreddit]
            }),
            {}
        )
}

function reducePosts(posts) {
    return (imagesArray, subreddit) => imagesArray.concat(posts[subreddit].images.map(imageUrl));
}

function imageUrl(image) {
    return image.url;
}
