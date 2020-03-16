import {applyMiddleware, combineReducers, createStore} from "redux";
import {dialogReducer} from "./DialogReducer";
import {profileReducer} from "./ProfileReducer";
import {usersReducer} from "./UsersReducer";
import {authReducer} from "./AuthReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./AppReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware)); // applyMiddleware(thunkMiddleware) - внедрение возможности в Reducer вызывать dispatch

export default store;

window.store = store;