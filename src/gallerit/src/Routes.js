import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider, observer} from 'mobx-react';
import {syncHistoryWithStore} from 'mobx-react-router';
import {createBrowserHistory} from 'history';
import Header from './Header';
import Images from './images/Images';

const Routes = ({stores}) => {
    const browserHistory = createBrowserHistory();
    const history = syncHistoryWithStore(browserHistory, stores.router);
    return (
        <Provider {...stores}>
            <BrowserRouter history={history}>
                <div>
                    <Header/>
                    <Route path="/r/:subreddits/(:sorting)?" component={Images}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
};
export default observer(Routes);
