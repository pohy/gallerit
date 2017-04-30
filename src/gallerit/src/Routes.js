import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider, observer} from 'mobx-react';
import {syncHistoryWithStore} from 'mobx-react-router';
import {createBrowserHistory} from 'history'
import App from './App';

const Routes = ({stores}) => {
    const browserHistory = createBrowserHistory();
    const history = syncHistoryWithStore(browserHistory, stores.router);
    return (
        <Provider {...stores}>
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/r/:subreddits" component={App}/>
                    <Route path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};
export default observer(Routes);
