import {combineReducers, createStore} from "redux";
import {dialogReducer} from "./dialogReducer";
import {profileReducer} from "./profileReducer";
import {sidebarReducer} from "./sidebarReducer";

/* reducers - список объектов которое хранит состояния/поведения
передача компоненту данных через пропсы осуществляется по ключу
при вызове dispatch(action), вывывеются по порядку перечисленные методы с параметром - action
 */
let reducers = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer
});

// store - реализация библиотеки "redux"
const store = createStore(reducers);

export default store;