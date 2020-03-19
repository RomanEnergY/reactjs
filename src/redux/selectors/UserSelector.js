import {createSelector} from 'reselect'

export const isFetching = (state) => {
    return state.usersPage.isFetching;
};

export const isReselectFetching = createSelector(isFetching, value => {
    return value;
});

export const getPageSize = (state) => {
    // console.log(`getPageSize=${state.usersPage.pageSize}`);
    return state.usersPage.pageSize;
};

export const getReselectPageSize = createSelector(getPageSize, value => {
    console.log(`getReselectPageSize=${value}`);
    return value;
});

export const getCurrentPage = (state) => {
    // console.log(`getCurrentPage=${state.usersPage.currentPage}`);
    return state.usersPage.currentPage;
};

export const getReselectCurrentPage = createSelector(getCurrentPage, value => {
    console.log(`getReselectCurrentPage=${value}`);
    return value;
});

export const getReselectTotalUserCount = createSelector((state => state.usersPage.totalUserCount), value => {
    console.log(`getReselectTotalUserCount=${value}`);
    return value;
});

export const getUserData = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: getReselectPageSize(state),
        currentPage: getReselectCurrentPage(state),
        totalUserCount: getReselectTotalUserCount(state),
        followingInProgress: state.usersPage.followingInProgress
    };
};



