import {api1} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS_DATA = 'SET_STATUS_DATA';
const UPDATE_STATUS = 'UPDATE_STATUS';
const SET_STATUS_FETCHING = 'SET_STATUS_FETCHING';
const SET_FETCHING = 'SET_FETCHING';
const SET_FETCHING_POST = 'SET_FETCHING_POST';

const addPost = (message) => ({type: ADD_POST, message});
const setUserProfile = (data) => ({type: SET_USER_PROFILE, data});
const setStatusData = (userId, data) => ({type: SET_STATUS_DATA, userId, data});
const updateMyStatus = (data) => ({type: UPDATE_STATUS, data});
const setStatusFetching = (fetching) => ({type: SET_STATUS_FETCHING, fetching});
const setFetching = (fetching) => ({type: SET_FETCHING, fetching});
const setFetchingPost = (fetchingPost) => ({type: SET_FETCHING_POST, fetchingPost});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 7}
    ],
    fetchingPost: false,
    newPostText: '',
    data: '',
    status: {
        userId: '',
        data: '',
        fetching: false
    },
    fetching: false
};

export const addNewPost = (message) => {
    return (dispatch) => {
        dispatch(setFetchingPost(true));
        dispatch(addPost(message));
        dispatch(setFetchingPost(true));
    }
};

export const setProfileUserByUserId = (userId) => {
    return (dispatch) => {
        dispatch(setFetching(true));
        api1.profile.getProfileUserByUserId(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
                dispatch(setFetching(false));
            });
    }
};

/**
 * Метод thunk-reducer получения статуса от сервера
 * 1. изменение полей reducer - начат запрос status: { ...state.status, fetching: true }
 * 2. получение данных от сервера, далее запись
 * 3. изменение полей reducer - status: { ...state.status, data, userId }
 * 4. изменение полей reducer - запрос окончен status: { ...state.status, fetching: false }
 *
 * @param userId
 * @returns {Function}
 */
export const setStatusByUserId = (userId) => {
    return (dispatch) => {
        dispatch(setStatusFetching(true));
        api1.profile.getStatusByUserId(userId)
            .then(response => {
                dispatch(setStatusData(userId, response.data));
                dispatch(setStatusFetching(false));
            });
    }
};

export const updateStatus = (newStatus) => {
    return (dispatch) => {
        dispatch(setStatusFetching(true));
        api1.profile.updateStatus(newStatus)
            .then(response => {
                dispatch(updateMyStatus(newStatus));
                dispatch(setStatusFetching(false));
            });
    }
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (action.message && action.message.length > 0) {
                return {
                    ...state,
                    posts: [
                        ...state.posts,
                        {
                            id: state.posts.length + 1,
                            message: action.message,
                            likesCount: 0
                        }
                    ]
                };
            }
            return state;

        case SET_USER_PROFILE:
            return {
                ...state,
                data: action.data
            };

        case SET_STATUS_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    data: action.data,
                    userId: action.userId
                }
            };

        case UPDATE_STATUS:
            return {
                ...state,
                status: {
                    ...state.status,
                    data: action.data
                }
            };

        case SET_STATUS_FETCHING:
            return {
                ...state,
                status: {
                    ...state.status,
                    fetching: action.fetching
                }
            };

        case SET_FETCHING:
            return {
                ...state,
                fetching: action.fetching
            };

        case SET_FETCHING_POST:
            return {
                ...state,
                fetchingPost: action.fetchingPost
            };

        default:
            return state;
    }
};
