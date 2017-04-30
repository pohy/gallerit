import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Routes from './Routes';
import stores from './stores';

ReactDOM.render(
    <Routes stores={stores}/>,
    document.getElementById('root')
);
