import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Search.scss';

class Search extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    static OPTIONS = {
        NSFW: 'nsfw',
        SORTING: 'sorting',
        SUBREDDITS: 'subreddits'
    };

    state = {
        showSearchOptions: false,
        options: {
            [Search.OPTIONS.NSFW]: false,
            [Search.OPTIONS.SORTING]: 'hot',
            [Search.OPTIONS.SUBREDDITS]: 'pics',
        }
    };

    componentDidMount() {
        this.props.onSubmit(this.state.options);
    }

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
        this.props.onSubmit(this.state.options);
        event.preventDefault();
    };

    render() {
        const {NSFW, SORTING, SUBREDDITS} = Search.OPTIONS;
        const {showSearchOptions} = this.state;
        const {nsfw, sorting, subreddits} = this.state.options;
        const formCss = `Search ${showSearchOptions ? 'options' : ''}`;
        const optionsCss = `options ${showSearchOptions ? '' : 'hidden'}`;
        const moreIconCss = `icon ${showSearchOptions ? 'less' : 'more'}-vertical`;

        return (
            <form className={formCss} onChange={this.onChange} onSubmit={this.onSubmit}>
                <div className="basic">
                    <button
                        type="button"
                        className="icon-button"
                        id="options-toggle"
                        onClick={this.toggleOptions}
                    >
                        <div className={moreIconCss}/>
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
        )
    }
}

export default Search;