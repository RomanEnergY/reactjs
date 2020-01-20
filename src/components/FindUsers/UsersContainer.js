import React from 'react';
import {connect} from "react-redux";
import Users from "./Users/Users";
import {followAC, setUsersAC, unFollowAC} from "../../redux/UsersReducer";

// Передача данных
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
};

// Передача методов
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => dispatch(followAC(userId)),
        unFollow: (userId) => dispatch(unFollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users))
    }
};

// Создание и настройка коннект данных, методов и компаненты
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;