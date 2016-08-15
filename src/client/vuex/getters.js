export default {
    form: (state) => state.form,
    images: (state) => state.images,
    loading: (state) => state.loading,
    fail: (state) => state.fail,
    nsfw: (state) => state.form.nsfw,
    hasImages: (state) => !!state.images.length
};