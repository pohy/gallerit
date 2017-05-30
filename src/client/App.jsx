import React, {Component} from 'react';
import 'normalize.css/normalize.css';

import './App.scss';
import {fetchPosts} from './image-source';
import Search from './Search.jsx';
import Slideshow from './Slideshow.jsx';

class Prototype extends Component {
    state = {
        images: [],
        failed: false,
        subredditPositions: {}
    };

    fetchPosts = async (options) => {
        const {subredditPositions} = this.state;
        try {
            const {images, positions} = await fetchPosts(options, Search.OPTIONS);
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

    render() {
        return (
            <div className="Prototype">
                <Search onSubmit={this.fetchPosts}/>
                <Slideshow images={this.state.images}/>
            </div>
        );
    }
}

export default Prototype;
