export default {
    form: (state) => state.form,
    images: (state) => state.images,
    loading: (state) => state.loading,
    fail: (state) => state.fail,
    imageNavigation: ({images, route: {query: {url}}}) => {
        if (!url) {
            console.error('Url query parameter is undefined');
            return createNavigation();
        }
        const currentImageIndex = images.findIndex((image) => image.url === url);
        return createNavigation(
            images[currentImageIndex],
            images[currentImageIndex + 1],
            images[currentImageIndex - 1]
        );

        function createNavigation(current, next, previous) {
            return {
                current,
                next,
                previous
            };
        }
    }
};