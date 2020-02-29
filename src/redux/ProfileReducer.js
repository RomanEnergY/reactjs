import {api} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FETCHING_PROFILE_USER = 'SET_FETCHING_PROFILE_USER';

export const addPost = () => ({type: ADD_POST});
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (data) => ({type: SET_USER_PROFILE, data: data});
const setFetching = (fetching) => ({type: SET_FETCHING_PROFILE_USER, fetching});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 7}
    ],
    newPostText: '',
    data: '',
    fetching: false
};

export const getProfileUser = (userId) => {
    return (dispatch) => {
        dispatch(setFetching(true));
        api.getProfileUser(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
                dispatch(setFetching(false));
            });
    }
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
        case SET_FETCHING_PROFILE_USER:
            return {
                ...state,
                fetching: action.fetching
            };
        default:
            return state;
    }
};
