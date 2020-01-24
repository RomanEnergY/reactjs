import React from 'react';
import {connect} from "react-redux";
import Users from "./Users/Users";
import {followAC, setCurrentPageAC, setTotalUserCountAC, setUsersAC, unFollowAC} from "../../redux/UsersReducer";

// Передача данных
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount
    }
};

// Передача методов
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => dispatch(followAC(userId)),
        unFollow: (userId) => dispatch(unFollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
        setTotalUserCount: (totalUserCount) => dispatch(setTotalUserCountAC(totalUserCount))
    }
};

// Создание и настройка коннект данных, методов и компаненты
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;