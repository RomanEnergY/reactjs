import {authAPI} from "../api/api";

const NAME_REDUCER = 'authReducer/';
const SET_RESULT_DATA = NAME_REDUCER + 'SET_RESULT_DATA';
const SET_USER_DATA = NAME_REDUCER + 'SET_USER_DATA';
const SET_FETCHING_AUTH_DATA = NAME_REDUCER + 'SET_FETCHING_AUTH_DATA';
const SET_LOGIN = NAME_REDUCER + 'SET_LOGIN';
const SET_ERROR_AUTH = NAME_REDUCER + 'SET_ERROR_AUTH';
const SET_FETCHING_CAPTCHA = NAME_REDUCER + 'SET_FETCHING_CAPTCHA';

const setAuthResultData = (resultCode, messages) => ({type: SET_RESULT_DATA, resultCode, messages});
const setAuthUserData = (id, login, email, messages) => ({type: SET_USER_DATA, id, login, email, messages});
const setFetching = (fetching) => ({type: SET_FETCHING_AUTH_DATA, fetching});
const setLogin = (isLogin) => ({type: SET_LOGIN, isLogin});
export const setErrorAuth = (error) => ({type: SET_ERROR_AUTH, error});
export const setFetchingCaptcha = (fetching) => ({type: SET_FETCHING_CAPTCHA, fetching});

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
    fetchingCaptcha: false,
    errorAuth: undefined
};


export const getAuthMeData = () => {
    return (dispatch) => {
        dispatch(setFetching(true));
        return authAPI.isAuthMe() // возвращаем Promise
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

export const authorizeOnService = (email, password, rememberMe, captcha) => {
    return (dispatch, getState) => {
        dispatch(setFetching(true));
        return authAPI.authorizeOnService(email, password, rememberMe, captcha)
            .then(response => {
                dispatch(getAuthMeData());
                dispatch(setErrorAuth(null));
                dispatch(setFetching(false));
                return Promise.resolve(true);

            })
            .catch(response => {
                dispatch(setErrorAuth({...response}));
                dispatch(setFetching(false));
                return Promise.reject({...response}); // передача ошибки на уровень выше

            });
    };
};

export const updateCaptcha = () => {
    return (dispatch, getState) => {
        let errorAuth = getState().auth.errorAuth;

        dispatch(setFetchingCaptcha(true));
        authAPI.getCaptchaUrl()
            .then(captcha => {
                dispatch(setErrorAuth({...errorAuth, captcha}));
                dispatch(setFetchingCaptcha(false));
            })
            .catch(onRejected => {
                dispatch(setFetchingCaptcha(false));
            })
    }
};


export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
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

        case SET_ERROR_AUTH:
            return {
                ...state,
                errorAuth: action.error
            };

        case SET_FETCHING_CAPTCHA:
            return {
                ...state,
                fetchingCaptcha: action.fetching
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
