import * as serviceWorker from './serviceWorker';
import state, {subscribe} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/state';
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = (prop) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={prop} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(store.getState());

state.subscribe(rerenderEntireTree);
serviceWorker.unregister();
