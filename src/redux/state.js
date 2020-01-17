import {dialogReducer} from "./dialogReducer";
import {profileReducer} from "./profileReducer";
import {sidebarReducer} from "./sidebarReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
                {id: 3, message: 'Blabla', likesCount: 11},
                {id: 4, message: 'Dada', likesCount: 11}
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessagesBody: '',

        },
        sidebar: {}
    },
    _callSubscribe() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscribe = observer;  // observer
    },
    dispatch(action) {
        dialogReducer(this._state.dialogsPage, action);
        profileReducer(this._state.profilePage, action);
        sidebarReducer(this._state.sidebar, action);

        this._callSubscribe(this._state);
    }
};

export default store;
window.state = store;