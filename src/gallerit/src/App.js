import React, {Component} from 'react';
import {inject} from 'mobx-react';
import './App.css';
import Header from './Header.js';

class App extends Component {
    constructor(props) {
        super(props);
        const {match: {params: {subreddits}}, search} = props;
        if (subreddits && search.subreddits !== subreddits) {
            search.changed('subreddits', subreddits);
        }
    }
    render() {
        console.log(this.props.children)
        return (
            <div className="App">
                {this.props.children}
            </div>
        );
    }
}

export default inject('search')(App);
