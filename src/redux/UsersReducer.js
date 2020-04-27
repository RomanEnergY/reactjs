import {followAPI, userAPI} from "../api/api";

const NAME_REDUCER = 'usersReducer/';
const SET_USERS = NAME_REDUCER + 'SET_USERS';
const FOLLOW = NAME_REDUCER + 'FOLLOW';
const SET_CURRENT_PAGE = NAME_REDUCER + 'SET_CURRENT_PAGE';
const SET_FETCHING = NAME_REDUCER + 'SET_FETCHING';
const SET_FOLLOWING_IN_PROGRESS = NAME_REDUCER + 'SET_FOLLOWING_IN_PROGRESS';

const follow = (userId, followed) => ({type: FOLLOW, userId, followed});
const setUsers = (users, totalUserCount) => ({type: SET_USERS, users, totalUserCount});
const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
const setFetching = (fetching) => ({type: SET_FETCHING, fetching});
const setFollowingInProgress = (isProgress, userId) => ({type: SET_FOLLOWING_IN_PROGRESS, isProgress, userId});

const pageSizeDefault = 24;

const initialState = {
    users: [],
    pageSize: pageSizeDefault,
    currentPage: 1,
    totalUserCount: 0,
    isFetching: false, // флаг получения данных
    followingInProgress: [] // Массив userId реализации подписки/отписки потльзователя
};

/**
 * Метод по средством замыкания передаваемых данных в теле которого вызываются комбинации методов dispatch простых
 * объектов (яркий пример: транзакция бизнес логики)
 *
 * @param pageNumber
 * @param pageSize
 */
export const getUsers = (pageNumber, pageSize = pageSizeDefault) => {
    return (dispatch) => {
        dispatch(setFetching(true));
        userAPI.getUsers(pageNumber, pageSize)
            .then(response => {
                dispatch(setUsers(response.items, response.totalCount));
                dispatch(setFetching(false));
            });
    };
};

export const onPageChanged = (pageNumber, pageSize = pageSizeDefault) => {
    return (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize))
    }
};

export const followUserMain = (userId, method, followed) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        method(userId)
            .then(response => {
                dispatch(follow(userId, followed));
                dispatch(setFollowingInProgress(false, userId));
            });
    };
};

export const followUser = (userId) => {
    return (dispatch) => {
        dispatch(followUserMain(userId, followAPI.follow, true));
    };
};

export const unFollowUser = (userId) => {
    return (dispatch) => {
        dispatch(followUserMain(userId, followAPI.unFollow, false));
    };
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                totalUserCount: action.totalUserCount
            };
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (action.userId === user.id)
                        return {
                            ...user,
                            followed: action.followed
                        };
                    return user;
                }),
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.fetching
            };
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isProgress /* если осуществляем запрос*/
                    ? [...state.followingInProgress, action.userId] /* добавляем id пользователя */
                    : state.followingInProgress.filter(id => id !== action.userId) /* delete id пользователя если id === action.userId (метод filter return Object[] */
            };
        default:
            return state;
    }
};
