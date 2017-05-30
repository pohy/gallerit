import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from '../loading/Loading';

class Images extends Component {
    componentDidMount() {
        const {match: {params: {subreddits}}, search} = this.props;
        if (subreddits) {
            search.changed('subreddits', subreddits);
            this.fetchImages();
        }
    }

    componentWillUpdate(props) {
        this.fetchImages(props);
    }

    fetchImages(props = this.props) {
        if (!props.match) {
            return;
        }
        const {match: {params: {subreddits: paramsSubreddits}}, search: {subreddits, nsfw, sorting}, images} = props;
        // images.queryImages(subreddits, sorting, nsfw);
    }

    render() {
        const {images: {isLoading, images}} = this.props;
        return (
            <div className="Images">
                {Object.keys(images).join(', ')}
                {isLoading && <Loading/>}
            </div>
        )
    }
}

export default inject('images', 'search')(
    observer(Images)
);