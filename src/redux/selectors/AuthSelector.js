export const isFetching = (state) => {
    return state.usersPage.isFetching;
};

export const getUserData = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount,
        followingInProgress: state.usersPage.followingInProgress
    };
};