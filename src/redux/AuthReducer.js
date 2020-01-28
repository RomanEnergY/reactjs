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

const SET_USER_DATA = 'SET_USER_DATA';
export const setAuthUserData = (data, messages) => ({type: SET_USER_DATA, data, messages});

const SET_FETCHING = 'SET_FETCHING';
export const setFetching = (fetching) => ({type: SET_FETCHING, fetching});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                data: {
                    ...action.data
                },
                messages: [...action.messages],
                isAuth: true
            };

        case SET_FETCHING:
            return {...state, isFetching: action.fetching};

        default:
            return state;
    }
};
