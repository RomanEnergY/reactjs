import * as serviceWorker from './serviceWorker';
import store from "./redux/reduxStore";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import StoreContext from "./StoreContext";

let rerenderEntireTree = (prop) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={prop}>
                <App/>
            </StoreContext.Provider>
        </BrowserRouter>, document.getElementById('root'));
};

rerenderEntireTree(store);

store.subscribe(() => rerenderEntireTree(store));

serviceWorker.unregister();
