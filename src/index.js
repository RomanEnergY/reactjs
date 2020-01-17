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
            <App state={prop} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(store.getState());

store.subscribe(() => rerenderEntireTree(store.getState()));

serviceWorker.unregister();
