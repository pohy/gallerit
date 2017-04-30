import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider, observer} from 'mobx-react';
import App from './App';

const Routes = ({stores}) => {
    return (
        <Provider {...stores}>
            <BrowserRouter>
                <Route path={['/', '/r/:subreddits']} component={App}/>
            </BrowserRouter>
        </Provider>
    );
};
export default observer(Routes);
