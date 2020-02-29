import {api} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING_AUTH_DATA = 'SET_FETCHING_AUTH_DATA';

const setAuthUserData = (id, login, email, messages) => ({type: SET_USER_DATA, id, login, email, messages});
const setFetching = (fetching) => ({type: SET_FETCHING_AUTH_DATA, fetching});

const initialState = {
    data: {
        id: null,
        login: null,
        email: null
    },
    messages: null,
    isAuth: false, // флаг состояния был ли ранее запрос на сервер и получены данные
    isFetching: false, // флаг текущего выполнения запроса на сервер
};

export const getAuthMeData = () => {
    return (dispatch) => {
        dispatch(setFetching(true));
        api.getAuthMe()
            .then(response => {
                dispatch(setFetching(false));
                if (response.resultCode === 0) {
                    dispatch(setAuthUserData(response.data.id, response.data.login, response.data.email, response.messages));
                }
            });
    };
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                data: {
                    id: action.id,
                    login: action.login,
                    email: action.email
                },
                messages: [...action.messages],
                isAuth: true
            };

        case SET_FETCHING_AUTH_DATA:
            return {...state, isFetching: action.fetching};

        default:
            return state;
    }
};
