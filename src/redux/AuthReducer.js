import {api} from "../api/api";
import {stopSubmit} from "redux-form";

const NAME_REDUCER = 'authReducer/';
const SET_RESULT_DATA = NAME_REDUCER + 'SET_RESULT_DATA';
const SET_USER_DATA = NAME_REDUCER + 'SET_USER_DATA';
const SET_FETCHING_AUTH_DATA = NAME_REDUCER + 'SET_FETCHING_AUTH_DATA';
const SET_LOGIN = NAME_REDUCER + 'SET_LOGIN';

const setAuthResultData = (resultCode, messages) => ({type: SET_RESULT_DATA, resultCode, messages});
const setAuthUserData = (id, login, email, messages) => ({type: SET_USER_DATA, id, login, email, messages});
const setFetching = (fetching) => ({type: SET_FETCHING_AUTH_DATA, fetching});
const setLogin = (isLogin) => ({type: SET_LOGIN, isLogin});

const initialState = {
    data: {
        id: undefined,
        login: undefined,
        email: undefined,
        resultCode: undefined,
        messages: undefined
    },
    isAuth: false, // флаг состояния авторизации true означает, что пользователь авторизирован
    isFetching: false, // флаг текущего выполнения запроса на сервер
};


export const getAuthMeData = () => {
    return (dispatch) => {
        dispatch(setFetching(true));
        return api.auth.isAuthMe() // возвращаем Promise
            .then(response => {
                dispatch(setAuthResultData(response.resultCode, response.messages));

                if (response.resultCode === 0) {
                    dispatch(setAuthUserData(response.data.id, response.data.login, response.data.email));
                    dispatch(setLogin(true));
                }

                dispatch(setFetching(false));
                return true; // возвращаем data в колбек Promise
            });
    };
};

export const authorizeOnService = (email, password, rememberMe) => {
    return (dispatch) => {
        api.auth.authorizeOnService(email, password, rememberMe)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(getAuthMeData());
                } else if (response.resultCode !== 0) {
                    dispatch(stopSubmit('login', {
                        _error: response.messages.length > 0 ? response.messages[0] : 'Some error'
                    }));
                }
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        api.auth.logout()
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setAuthUserData(undefined, undefined, undefined));
                    dispatch(setLogin(false));
                }
            });
    };
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESULT_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    resultCode: action.resultCode,
                    messages: [...action.messages],
                }
            };

        case SET_LOGIN:
            return {
                ...state,
                isAuth: action.isLogin
            };

        case SET_USER_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id,
                    login: action.login,
                    email: action.email
                }
            };

        case SET_FETCHING_AUTH_DATA:
            return {
                ...state,
                isFetching: action.fetching
            };

        default:
            return state;
    }
};
