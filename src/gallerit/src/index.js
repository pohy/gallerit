import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Routes from './Routes';
import observables from './observables';

ReactDOM.render(
    <Routes observables={observables}/>,
    document.getElementById('root')
);
