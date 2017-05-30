import {RouterStore} from 'mobx-react-router';
import SearchStore from './search/SearchStore';
import ImageStore from './images/ImageStore';

const stores = {
    search: new SearchStore(),
    router: new RouterStore(),
    images: new ImageStore()
};

export default stores;