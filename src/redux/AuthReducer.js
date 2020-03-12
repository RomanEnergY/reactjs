import {api1} from "../api/api";

const SET_RESULT_DATA = 'SET_RESULT_DATA';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING_AUTH_DATA = 'SET_FETCHING_AUTH_DATA';
const SET_FETCHING_LOGIN = 'SET_FETCHING_LOGIN';

const setAuthResultData = (resultCode, messages) => ({type: SET_RESULT_DATA, resultCode, messages});
const setAuthUserData = (id, login, email, messages) => ({type: SET_USER_DATA, id, login, email, messages});
const setFetching = (fetching) => ({type: SET_FETCHING_AUTH_DATA, fetching});
const setFetchingLogin = (fetchingLogin) => ({type: SET_FETCHING_LOGIN, fetchingLogin});

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
    isFetchingLogin: false, // флаг текущего выполнения запроса на сервер -> login
};


export const getAuthMeData = () => {
    return (dispatch) => {
        dispatch(setFetching(true));
        api1.auth.isAuthMe()
            .then(response => {
                dispatch(setAuthResultData(response.resultCode, response.messages));

                if (response.resultCode === 0)
                    dispatch(setAuthUserData(response.data.id, response.data.login, response.data.email));

                dispatch(setFetching(false));
            });
    };
};

export const authorizeOnService = (email, password, rememberMe) => {
    return (dispatch) => {
        dispatch(setFetchingLogin(true));
        api1.auth.authorizeOnService(email, password, rememberMe)
            .then(response => {
                dispatch(setAuthResultData(response.resultCode, response.messages));

                if (response.resultCode === 0) {
                    dispatch(setAuthUserData(undefined, undefined, undefined));
                    dispatch(getAuthMeData());
                }

                dispatch(setFetchingLogin(false));
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(setFetchingLogin(true));
        api1.auth.logout()
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setAuthUserData(undefined, undefined, undefined));
                }

                dispatch(setFetchingLogin(false));
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

        case SET_USER_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id,
                    login: action.login,
                    email: action.email
                },
                isAuth: true
            };

        case SET_FETCHING_AUTH_DATA:
            return {...state, isFetching: action.fetching};

        default:
            return state;
    }
};
