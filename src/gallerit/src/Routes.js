import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider, observer} from 'mobx-react';
import App from './App';

const Routes = ({observables}) => {
    return (
        <Provider {...observables}>
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </Provider>
    );
};
export default observer(Routes);
