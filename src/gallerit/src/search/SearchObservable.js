import {extendObservable} from 'mobx';
import {SORT_OPTIONS} from './Search';

class SearchObservable {
    constructor() {
        extendObservable(this, {
            nsfw: false,
            sorting: Object.keys(SORT_OPTIONS)[0],
            subreddits: ''
        });
    }

    changed(option, value) {
        if (typeof this[option] === 'undefined') {
            throw new Error(`Option '${option}' does not exist!`);
        }
        this[option] = value;
    }
}

export default SearchObservable;
