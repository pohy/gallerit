import React, {Component} from 'react';
import 'normalize.css/normalize.css';

import './App.scss';
import {fetchPosts} from './image-source';
import Search from './Search.jsx';

class Prototype extends Component {
    static SEARCH_OPTIONS = {
        NSFW: 'nsfw',
        SORTING: 'sorting',
        SUBREDDITS: 'subreddits'
    };

    state = {
        showSearchOptions: false,
        imageIndex: 0,
        images: [],
        failed: false,
        options: {
            [Prototype.SEARCH_OPTIONS.NSFW]: false,
            [Prototype.SEARCH_OPTIONS.SORTING]: 'hot',
            [Prototype.SEARCH_OPTIONS.SUBREDDITS]: 'pics',
        },
        subredditPositions: {}
    };

    fetchPosts = async (options) => {
        // TODO refactor outside of the component
        const {subredditPositions} = this.state;
        try {
            const {images, positions} = await fetchPosts(options, Prototype.SEARCH_OPTIONS);
            this.setState({
                failed: false,
                images,
                subredditPositions: {...subredditPositions, positions},
                imageIndex: 0
            });
        } catch (error) {
            console.error(error);
            this.setState({failed: true});
        }
    };

    nextImage = () => {
        const {imageIndex, images} = this.state;
        const nextImage = imageIndex + 1 < images.length
            ? imageIndex + 1
            : 0;
        this.setState({imageIndex: nextImage})
    };

    previousImage = () => {
        const {imageIndex, images} = this.state;
        const previousImage = imageIndex > 0
            ? imageIndex - 1
            : images.length - 1;
        this.setState({imageIndex: previousImage})
    };

    render() {
        const {imageIndex, images} = this.state;

        return (
            <div className="Prototype">
                <Search onSubmit={this.fetchPosts}/>
                <div className="slideshow">
                    <button className="nav previous" onClick={this.previousImage}/>
                    <div className="image">
                        <img src={images[imageIndex]}/>
                    </div>
                    <button className="nav next" onClick={this.nextImage}/>
                </div>
            </div>
        );
    }
}

export default Prototype;
