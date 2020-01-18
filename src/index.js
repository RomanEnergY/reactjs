import * as serviceWorker from './serviceWorker';
import store from "./redux/reduxStore";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = (prop) => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={prop}/>
        </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(store);

store.subscribe(() => rerenderEntireTree(store));

serviceWorker.unregister();
