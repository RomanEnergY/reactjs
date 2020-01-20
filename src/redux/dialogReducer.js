const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGES_BODY_TEXT = 'UPDATE-NEW-MESSAGES-BODY-TEXT';

export const addMessageAction = () => ({type: ADD_MESSAGE});
export const updateNewMessagesBodyTextAction = (text) => ({type: UPDATE_NEW_MESSAGES_BODY_TEXT, newText: text});

const initialState = {
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
        {id: 3, message: 'Yo'}
    ],
    newMessagesBody: '',
};

export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.newMessagesBody.length > 0) {
                return {
                    ...state,
                    messages: [
                        ...state.messages,
                        {id: state.messages.length + 1, message: state.newMessagesBody}],
                    newMessagesBody: ''
                };
            }
            return state;

        case UPDATE_NEW_MESSAGES_BODY_TEXT:
            return {
                ...state,
                newMessagesBody: action.newText
            };

        default:
            return state;
    }
};
