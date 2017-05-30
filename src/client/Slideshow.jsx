import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Slideshow.scss';

class Slideshow extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired
    };

    state = {
        imageIndex: 0
    };

    nextImage = () => {
        const {imageIndex} = this.state;
        const nextImage = imageIndex + 1 < this.props.images.length
            ? imageIndex + 1
            : 0;
        this.setState({imageIndex: nextImage})
    };

    previousImage = () => {
        const {imageIndex} = this.state;
        const previousImage = imageIndex > 0
            ? imageIndex - 1
            : this.props.images.length - 1;
        this.setState({imageIndex: previousImage})
    };

    render() {
        return (
            <div className="Slideshow">
                <button className="nav previous" onClick={this.previousImage}/>
                <div className="image">
                    <img src={this.props.images[this.state.imageIndex]}/>
                </div>
                <button className="nav next" onClick={this.nextImage}/>
            </div>
        );
    }
}

export default Slideshow;