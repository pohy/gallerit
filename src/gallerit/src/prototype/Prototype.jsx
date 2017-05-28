import React, {Component} from 'react';
import 'normalize.css/normalize.css';
import './Prototype.scss';
import {fetchPosts} from './image-source';

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
            [Prototype.SEARCH_OPTIONS.SUBREDDITS]: 'gif',
        },
        subredditPositions: {}
    };

    // componentDidMount = this.fetchImages; // TODO: GitHub issue
    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = async () => {
        // TODO refactor outside of the component
        const {options, subredditPositions} = this.state;
        try {
            const {images, positions} = await fetchPosts(options, Prototype.SEARCH_OPTIONS);
            console.log(images, positions)
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

    toggleOptions = () => this.setState({showSearchOptions: !this.state.showSearchOptions});

    onChange = ({target: {type, name, value, checked}}) => {
        this.setState({
            options: {
                ...this.state.options,
                [name]: type === 'checkbox' ? checked : value
            }
        });
    };

    onSubmit = (event) => {
        this.fetchPosts();
        event.preventDefault();
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
        const {NSFW, SORTING, SUBREDDITS} = Prototype.SEARCH_OPTIONS;
        const {showSearchOptions, imageIndex, images} = this.state;
        const {nsfw, sorting, subreddits} = this.state.options;
        const optionsCss = `search-options ${showSearchOptions ? '' : 'hidden'}`;
        const formCss = `search-bar ${showSearchOptions ? 'options' : ''}`;
        console.log(images, imageIndex)

        return (
            <div className="Prototype">
                <form className={formCss} onChange={this.onChange} onSubmit={this.onSubmit}>
                    <div className="search-basic">
                        <button
                            type="button"
                            className="icon-button"
                            id="search-options-toggle"
                            onClick={this.toggleOptions}
                        >
                            <div className="more-vertical icon"/>
                        </button>
                        <input
                            className="subreddits"
                            name={SUBREDDITS}
                            value={subreddits}
                            type="text"
                            placeholder="gif, pics, gonewild..."
                            autoFocus
                        />
                        <button type="submit" className="icon-button">
                            <div className="search icon"/>
                        </button>
                    </div>
                    <div className={optionsCss}>
                        <label className="option">
                            <input type="checkbox" name={NSFW} checked={nsfw}/>
                            &nbsp;NSFW
                        </label>
                        <span>| Sorting</span>
                        <select className="option" name={SORTING} selected={sorting}>
                            <option value="hot">Hot</option>
                            <option value="top">Top</option>
                            <option value="new">New</option>
                        </select>
                    </div>
                </form>
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
