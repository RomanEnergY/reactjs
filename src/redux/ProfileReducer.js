import {api} from "../api/api";

const NAME_REDUCER = 'profileReducer/';
const ADD_POST = NAME_REDUCER + 'ADD-POST';
const SET_USER_PROFILE = NAME_REDUCER + 'SET_USER_PROFILE';
const SET_STATUS_DATA = NAME_REDUCER + 'SET_STATUS_DATA';
const SET_STATUS_FETCHING = NAME_REDUCER + 'SET_STATUS_FETCHING';
const SET_FETCHING_POST = NAME_REDUCER + 'SET_FETCHING_POST';

const addPost = (message) => ({type: ADD_POST, message});
const setUserProfile = (data) => ({type: SET_USER_PROFILE, data});
const setStatusData = (data) => ({type: SET_STATUS_DATA, textStatus: data});
const setStatusFetching = (fetching) => ({type: SET_STATUS_FETCHING, fetching});
const setFetchingPost = (fetchingPost) => ({type: SET_FETCHING_POST, fetchingPost});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 7}
    ],
    fetchingPost: false,
    newPostText: '',
    status: {
        textStatus: null,
        data: {
            aboutMe: null,
            contacts: {
                facebook: null,
                website: null,
                vk: null,
                twitter: null,
                instagram: null,
                youtube: null,
                github: null,
                mainLink: null
            },
            lookingForAJob: false,
            lookingForAJobDescription: null,
            fullName: null,
            userId: null,
            photos: {
                small: null,
                large: null
            }
        },
        fetching: false
    }
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
        dispatch(setStatusFetching(true));
        api.profile.getProfileUserByUserId(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
                dispatch(setStatusFetching(false));
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
        api.profile.getTextStatusByUserId(userId)
            .then(response => {
                dispatch(setStatusData(response.data));
                dispatch(setStatusFetching(false));
            });
    }
};

export const updateStatus = (newStatus) => {
    return (dispatch) => {
        dispatch(setStatusFetching(true));
        api.profile.updateStatus(newStatus)
            .then(response => {
                dispatch(setStatusData(newStatus));
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
                        ...state.posts, {
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
                status: {
                    ...state.status,
                    data: action.data
                }
            };

        case SET_STATUS_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    textStatus: action.textStatus
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

        case SET_FETCHING_POST:
            return {
                ...state,
                fetchingPost: action.fetchingPost
            };

        default:
            return state;
    }
};
