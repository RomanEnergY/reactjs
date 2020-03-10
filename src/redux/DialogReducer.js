const ADD_MESSAGE = 'ADD-MESSAGE';

const addMessageAction = (message) => ({type: ADD_MESSAGE, message});

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
    ]
};

export const addMessage = (message) => {
    return (dispatch) => {
        dispatch(addMessageAction(message));
    }
};

export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (action.message && action.message.length > 0) {
                return {
                    ...state,
                    messages: [
                        ...state.messages,
                        {
                            id: state.messages.length + 1,
                            message: action.message
                        }
                    ]
                };
            }
            return state;

        default:
            return state;
    }
};
