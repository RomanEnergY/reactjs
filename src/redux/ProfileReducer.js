const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export const addPost = () => ({type: ADD_POST});
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (data) => ({type: SET_USER_PROFILE, data: data});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 7}
    ],
    newPostText: '',
    data: ''
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
        case SET_USER_PROFILE:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
};
