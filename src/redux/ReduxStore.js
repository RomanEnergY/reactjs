import {combineReducers, createStore} from "redux";
import {dialogReducer} from "./DialogReducer";
import {profileReducer} from "./ProfileReducer";
import {sidebarReducer} from "./SidebarReducer";
import {usersReducer} from "./UsersReducer";

/* reducers - список объектов которое хранит состояния/поведения
передача компоненту данных через пропсы осуществляется по ключу
при вызове dispatch(action), вывывеются по порядку перечисленные методы с параметром - action
 */
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer
});

// store - реализация библиотеки "redux"
const store = createStore(reducers);

export default store;