import {applyMiddleware, combineReducers, createStore} from "redux";
import {dialogReducer} from "./DialogReducer";
import {profileReducer} from "./ProfileReducer";
import {sidebarReducer} from "./SidebarReducer";
import {usersReducer} from "./UsersReducer";
import {authReducer} from "./AuthReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware)); // applyMiddleware(thunkMiddleware) - внедрение возможности в Reducer вызывать dispatch

export default store;

window.store = store;