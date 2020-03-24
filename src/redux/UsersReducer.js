import {api} from "../api/api";

const NAME_REDUCER = 'usersReducer/';
const SET_USERS = NAME_REDUCER + 'SET_USERS';
const FOLLOW = NAME_REDUCER + 'FOLLOW';
const UN_FOLLOW = NAME_REDUCER + 'UN_FOLLOW';
const SET_CURRENT_PAGE = NAME_REDUCER + 'SET_CURRENT_PAGE';
const SET_FETCHING_USER = NAME_REDUCER + 'SET_FETCHING_USER';
const SET_FOLLOWING_IN_PROGRESS = NAME_REDUCER + 'SET_FOLLOWING_IN_PROGRESS';

const follow = (userId) => ({type: FOLLOW, userId});
const unFollow = (userId) => ({type: UN_FOLLOW, userId});
const setUsers = (users, totalUserCount) => ({type: SET_USERS, users, totalUserCount});
const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
const setFetching = (fetching) => ({type: SET_FETCHING_USER, fetching});
const setFollowingInProgress = (isFetching, userId) => ({type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId});

const pageSizeDefault = 24;

const initialState = {
    users: [],
    pageSize: pageSizeDefault,
    currentPage: 1,
    totalUserCount: 0,
    isFetching: false, // флаг получения данных
    followingInProgress: []
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
        const setUserData = api.getUsers(pageNumber, pageSize)
            .then(response => {
                dispatch(setUsers(response.items, response.totalCount));
            });

        setUserData.then(() => {
            dispatch(setFetching(false));
        })
    };
};

export const onPageChanged = (pageNumber, pageSize = pageSizeDefault) => {
    return (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize))
    }
};

export const followUser = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        api.follow(userId)
            .then(response => {
                dispatch(follow(userId));
                dispatch(setFollowingInProgress(false, userId));
            });
    };
};

export const unFollowUser = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        api.unFollow(userId)
            .then(response => {
                dispatch(unFollow(userId));
                dispatch(setFollowingInProgress(false, userId));
            });
    };
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            // return {...state, users: [...state.users, ...action.users]}; // Поверхностная копия, в users поверхностно скопировать users и добавить users из action, добавляем в конец массива
            return {
                ...state,
                users: action.users,
                totalUserCount: action.totalUserCount
            };
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
        case SET_FETCHING_USER:
            return {
                ...state,
                isFetching: action.fetching
            };
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching /* если осуществляем запрос*/
                    ? [...state.followingInProgress, action.userId] /* добавляем id пользователя */
                    : state.followingInProgress.filter(id => id !== action.userId) /* удаляем id пользователя если id === action.userId (метод filter return Object[] */
            };
        default:
            return state;
    }
};
