const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGES_BODY_TEXT = 'UPDATE-NEW-MESSAGES-BODY-TEXT';

export const addMessageAction = () => ({type: ADD_MESSAGE});
export const updateNewMessagesBodyTextAction = (text) => ({type: UPDATE_NEW_MESSAGES_BODY_TEXT, newText: text});

export const dialogReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messages.length,
                message: state.newMessagesBody
            };
            state.messages.push(newMessage);
            state.newMessagesBody = '';
            return state;

        case UPDATE_NEW_MESSAGES_BODY_TEXT:
            state.newMessagesBody = action.newText;
            return state;

        default:
            return state;
    }
};
