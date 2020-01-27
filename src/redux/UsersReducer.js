const initialState = {
    users: [],
    pageSize: 5,
    currentPage: 1,
    totalUserCount: 0,
    isFetching: false, // флаг получения данных
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            // return {...state, users: [...state.users, ...action.users]}; // Поверхностная копия, в users поверхностно скопировать users и добавить users из action, добавляем в конец массива
            return {...state, users: action.users}; // перезатирание пользователей
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id)
                        return {
                            ...u,
                            followed: true
                        };

                    return u;
                }),
            };
        case UN_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id)
                        return {
                            ...u,
                            followed: false
                        };

                    return u;
                }),
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalUserCount: action.totalUserCount
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.fetching
            };
        default:
            return state;
    }
};

const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const SET_FETCHING = 'SET_FETCHING';

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unFollowAC = (userId) => ({type: UN_FOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUserCountAC = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, totalUserCount});
export const setFetchingAC = (fetching) => ({type: SET_FETCHING, fetching});