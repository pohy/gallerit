import React, {Component} from 'react';
import 'normalize.css/normalize.css';
import './Prototype.scss';

class Prototype extends Component {
    static IMAGES = [
        'https://c1.staticflickr.com/1/594/32809944591_cddb0d569d_o.jpg',
        'https://c1.staticflickr.com/3/2887/32809944191_a00c3fe677_o.jpg',
        'https://c2.staticflickr.com/4/3910/32553209920_6789a0a087_o.jpg',
        'https://c2.staticflickr.com/8/7789/27472136736_6a7fd80073_o.jpg',
        'https://c2.staticflickr.com/8/7182/27407653782_65131ba124_o.jpg'
    ];
    constructor(props) {
        super(props);

        this.state = {
            options: false,
            imageIndex: 0
        };
    }

    toggleOptions = () => this.setState({options: !this.state.options});
    onSubmit = (event) => event.preventDefault();
    nextImage = () => {
        const {imageIndex} = this.state;
        const nextImage = imageIndex + 1 < Prototype.IMAGES.length
            ? imageIndex + 1
            : 0;
        this.setState({imageIndex: nextImage})
    };
    previousImage = () => {
        const {imageIndex} = this.state;
        const previousImage = imageIndex > 0
            ? imageIndex - 1
            : Prototype.IMAGES.length - 1;
        this.setState({imageIndex: previousImage})
    };

    render() {
        const {options, imageIndex} = this.state;
        const optionsCss = `search-options ${options ? '' : 'hidden'}`;
        const formCss = `search-bar ${options ? 'options' : ''}`;

        return (
            <div className="Prototype">
                <form className={formCss} onSubmit={this.onSubmit}>
                    <div className="search-basic">
                        <button type="button" className="icon-button" id="search-options-toggle" onClick={this.toggleOptions}>
                            <div className="more-vertical icon"/>
                        </button>
                        <input className="subreddits" type="text" placeholder="gif, pics, gonewild..." autoFocus/>
                        <button type="submit" className="icon-button">
                            <div className="search icon"/>
                        </button>
                    </div>
                    <div className={optionsCss}>
                        <label className="option">
                            <input type="checkbox"/>
                            &nbsp;NSFW
                        </label>
                        <span>| Sorting</span>
                        <select className="option">
                            <option value="hot">Hot</option>
                            <option value="top">Top</option>
                            <option value="new">New</option>
                        </select>
                    </div>
                </form>
                <div className="slideshow">
                    <button className="nav previous" onClick={this.previousImage}/>
                    <div className="image">
                        <img src={Prototype.IMAGES[imageIndex]}/>
                    </div>
                    <button className="nav next" onClick={this.nextImage}/>
                </div>
            </div>
        );
    }
}

export default Prototype;
