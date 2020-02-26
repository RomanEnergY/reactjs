const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const SET_FETCHING = 'SET_FETCHING';
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS';

export const follow = (userId) => ({type: FOLLOW, userId});
export const unFollow = (userId) => ({type: UN_FOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUserCount = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, totalUserCount});
export const setFetching = (fetching) => ({type: SET_FETCHING, fetching});
export const setFollowingInProgress = (isFetching, userId) => ({type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId});

const initialState = {
    users: [],
    pageSize: 24,
    currentPage: 1,
    totalUserCount: 0,
    isFetching: false, // флаг получения данных
    followingInProgress: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            // return {...state, users: [...state.users, ...action.users]}; // Поверхностная копия, в users поверхностно скопировать users и добавить users из action, добавляем в конец массива
            return {...state, users: action.users};
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
        case SET_FOLLOWING_IN_PROGRESS:
            debugger
            return {
                ...state,
                followingInProgress: action.isFetching /* если осуществляем запрос*/
                    ? [...state.followingInProgress, action.userId] /* добавляем id пользователя */
                    : state.followingInProgress.filter(id => id != action.userId) /* удаляем id пользователя если id === action.userId (метод filter return Object[] */
            };
        default:
            return state;
    }
};
