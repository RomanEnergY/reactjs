import {profileAPI} from "../api/api";

const NAME_REDUCER = 'profileReducer/';
const ADD_POST = NAME_REDUCER + 'ADD-POST';
const SET_FETCHING_POST = NAME_REDUCER + 'SET_FETCHING_POST';
const SET_STATUS_DATA = NAME_REDUCER + 'SET_STATUS_DATA';
const SET_STATUS_FETCHING = NAME_REDUCER + 'SET_STATUS_FETCHING';
const SET_PROFILE_DATA = NAME_REDUCER + 'SET_PROFILE_DATA';
const SET_PROFILE_FETCHING = NAME_REDUCER + 'SET_PROFILE_FETCHING';
const SET_PHOTOS_FETCHING = NAME_REDUCER + 'SET_PHOTOS_FETCHING';
const SET_PHOTOS_DATA = NAME_REDUCER + 'SET_PHOTOS_DATA';
const SET_ERROR_PHOTOS_DATA = NAME_REDUCER + 'SET_ERROR_PHOTOS_DATA';

const addPost = (message) => ({type: ADD_POST, message});
const setFetchingPost = (fetchingPost) => ({type: SET_FETCHING_POST, fetchingPost});
const setStatusData = (data) => ({type: SET_STATUS_DATA, data});
const setStatusFetching = (fetching) => ({type: SET_STATUS_FETCHING, fetching});
const setProfileData = (data) => ({type: SET_PROFILE_DATA, data});
const setProfileFetching = (fetching) => ({type: SET_PROFILE_FETCHING, fetching});
const setPhotosFetching = (fetching) => ({type: SET_PHOTOS_FETCHING, fetching});
const setPhotosData = (photos) => ({type: SET_PHOTOS_DATA, photos});
const setErrorPhotosData = (error) => ({type: SET_ERROR_PHOTOS_DATA, error});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 7}
    ],
    fetchingPost: false,
    newPostText: '',
    status: {
        data: null,
        fetching: false
    },
    profile: {
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
            userId: null
        },
        fetching: false
    },
    photo: {
        photos: {
            small: null,
            large: null
        },
        error: undefined,
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
        dispatch(setProfileFetching(true));
        profileAPI.getProfileUserByUserId(userId)
            .then(response => {
                dispatch(setProfileData(response.data));
                dispatch(setErrorPhotosData(null));
                dispatch(setProfileFetching(false));
            });
    }
};

export const getProfileDataAuth = () => {
    return (dispatch, getState) => {
        dispatch(setProfileUserByUserId(getState().auth.data.id));
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
        profileAPI.getTextStatusByUserId(userId)
            .then(response => {
                dispatch(setStatusData(response.data));
                dispatch(setStatusFetching(false));
            });
    }
};

export const updateStatus = (newStatus) => {
    return (dispatch) => {
        dispatch(setStatusFetching(true));
        profileAPI.updateStatus(newStatus)
            .then(response => {
                dispatch(setStatusData(newStatus));
                dispatch(setStatusFetching(false));
            });
    }
};

export const setStatusDataContacts = (statusDataContacts) => {
    return (dispatch, getState) => {
        // dispatch(setStatusProfileData(statusDataContacts));
        dispatch(setProfileFetching(true));
        return profileAPI.updateStatusDataContacts(statusDataContacts)
            .then(responseThen => {
                dispatch(setProfileUserByUserId(getState().auth.data.id));
            })
            .catch(responseRej => {
                dispatch(setProfileFetching(false));
                return Promise.reject({...responseRej}); // передача ошибки на уровень выше
            })
    }
};

export const setProfilePhoto = (photo) => {
    return (dispatch, getState) => {
        dispatch(setPhotosFetching(true));
        return profileAPI.updateProfilePhoto(photo)
            .then(responseThen => {
                dispatch(setPhotosData(responseThen.data.data.photos));
                dispatch(setErrorPhotosData(null));
                dispatch(setPhotosFetching(false));
            })
            .catch(responseRej => {
                dispatch(setErrorPhotosData(responseRej.data.messages[0]));
                dispatch(setPhotosFetching(false));
            })
    }
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_FETCHING:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fetching: action.fetching
                }
            };

        case SET_PROFILE_DATA:
            const photos = {...action.data.photos};
            delete action.data.photos;

            return {
                ...state,
                profile: {
                    ...state.profile,
                    data: action.data,
                },
                photo: {
                    ...state.photo,
                    photos
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

        case SET_STATUS_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    data: action.data
                }
            };

        case SET_FETCHING_POST:
            return {
                ...state,
                fetchingPost: action.fetchingPost
            };

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

        case SET_PHOTOS_FETCHING:
            return {
                ...state,
                photo: {
                    ...state.photo,
                    fetching: action.fetching
                }
            };

        case SET_PHOTOS_DATA:
            return {
                ...state,
                photo: {
                    ...state.photo,
                    photos: action.photos
                }
            };

        case SET_ERROR_PHOTOS_DATA:
            return {
                ...state,
                photo: {
                    ...state.photo,
                    error: action.error
                }
            };

        default:
            return state;
    }
};