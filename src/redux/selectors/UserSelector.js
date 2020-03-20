import {createSelector} from 'reselect'

export const isFetching = (state) => {
    return state.usersPage.isFetching;
};

export const isReselectFetching = createSelector(isFetching, value => {
    return value;
});

export const getUsers = (state) => {
    return state.usersPage.users;
};

export const getReselectUsers = createSelector(getUsers, value => value);
export const getReselectPageSize = createSelector((state => state.usersPage.pageSize), value => value);
export const getReselectCurrentPage = createSelector((state => state.usersPage.currentPage), value => value);
export const getReselectTotalUserCount = createSelector((state => state.usersPage.totalUserCount), value => value);
export const getReselectFollowingInProgress = createSelector((state => state.usersPage.followingInProgress), value => value);
