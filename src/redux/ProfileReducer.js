const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const addPostAction = () => ({type: ADD_POST});
export const updateNewPostTextAction = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 7}
    ],
    newPostText: ''
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText.length > 0) {
                return {
                    ...state,
                    posts: [
                        {id: state.posts.length + 1, message: state.newPostText, likesCount: 0},
                        ...state.posts],
                    newPostText: ''
                };
            }
            return state;

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };

        default:
            return state;
    }
};
