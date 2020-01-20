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
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessagesBody: '',
};

export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.newMessagesBody.length > 0) {
                let newMessage = {
                    id: state.messages.length,
                    message: state.newMessagesBody
                };
                let copyState = {...state};
                copyState.messages = [...state.messages];
                copyState.messages.push(newMessage);
                copyState.newMessagesBody = '';

                return copyState;
            }
            return state;

        case UPDATE_NEW_MESSAGES_BODY_TEXT:
            let copyState = {...state};
            copyState.newMessagesBody = action.newText;
            return copyState;

        default:
            return state;
    }
};
