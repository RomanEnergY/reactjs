import {api} from "../api/api";

const SET_RESULT_DATA = 'SET_RESULT_DATA';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING_AUTH_DATA = 'SET_FETCHING_AUTH_DATA';

const setAuthResultData = (resultCode, messages) => ({type: SET_RESULT_DATA, resultCode, messages});
const setAuthUserData = (id, login, email, messages) => ({type: SET_USER_DATA, id, login, email, messages});
const setFetching = (fetching) => ({type: SET_FETCHING_AUTH_DATA, fetching});

const initialState = {
    data: {
        id: undefined,
        login: undefined,
        email: undefined,
        resultCode: undefined,
        messages: undefined
    },
    isAuth: false, // флаг состояния был ли ранее запрос на сервер и получены данные
    isFetching: false, // флаг текущего выполнения запроса на сервер
};

export const getAuthMeData = () => {
    return (dispatch) => {
        dispatch(setFetching(true));
        api.getAuthMe()
            .then(response => {
                dispatch(setAuthResultData(response.resultCode, response.messages));

                if (response.resultCode === 0)
                    dispatch(setAuthUserData(response.data.id, response.data.login, response.data.email));

                dispatch(setFetching(false));
            });
    };
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESULT_DATA:
            return {
                ...state,
                data: {
                    resultCode: action.resultCode,
                    messages: [...action.messages],
                },
                isAuth: true
            };

        case SET_USER_DATA:
            return {
                ...state,
                data: {
                    id: action.id,
                    login: action.login,
                    email: action.email
                }
            };

        case SET_FETCHING_AUTH_DATA:
            return {...state, isFetching: action.fetching};

        default:
            return state;
    }
};
