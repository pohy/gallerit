import {RouterStore} from 'mobx-react-router';
import SearchStore from './search/SearchStore';

const stores = {
    search: new SearchStore(),
    router: new RouterStore()
};

export default stores;