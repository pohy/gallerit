import {extendObservable, action} from 'mobx';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const API_URL = `${location.protocol}//${IS_PRODUCTION ? location.host : 'localhost:3000'}/api`;

class ImageStore {
    constructor() {
        extendObservable(this, {
            isLoading: false,
            hasFailed: false,
            images: []
        });
    }

    queryImages = action(async (subreddits, sorting, nsfw) => {
        try {
            this.isLoading = true;
            const imagesResponse = await fetch(
                API_URL
                + `?subreddits=${subreddits.replace(/\s/g, '')}`
                + `&sorting=${sorting}`
                + `&nsfw=${nsfw}`
            );
            const images = await imagesResponse.json();
            this.images = images;
        } catch (error) {
            this.hasFailed = true;
        } finally {
            this.isLoading = false;
        }
    });
}

export default ImageStore;

