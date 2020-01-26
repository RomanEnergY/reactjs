import React from 'react';
import {connect} from "react-redux";
import {followAC, setCurrentPageAC, setTotalUserCountAC, setUsersAC, unFollowAC} from "../../redux/UsersReducer";
import * as axios from "axios";
import Users from "./Users/Users";

/*
    По средством connect передаем в UsersContainer данные,
    UsersContainer осуществляет передачу запросов и получение данных,
    далее данные передаются в презентационную компаненту Users
 */
class UsersContainer extends React.Component {
    // по средством connect получаем this.props
    componentDidMount() {
        this.getUserPageNumber(this.props.currentPage);
    }

    componentWillUnmount() {

    }

    // метод запроса на сервер данных
    getUserPageNumber = (pageNumber) => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users" +
            `?page=${pageNumber}` +
            `&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
            });
    };

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        // Передаем pageNumber т.к. еще props новые к нам не пришли... должен оработать данный метод до конца
        this.getUserPageNumber(pageNumber);
    };

    render() {
        return <Users
            totalUserCount={this.props.totalUserCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unFollow={this.props.unFollow}
            follow={this.props.follow}
            onPageChanged={this.onPageChanged}

        />
    }
}

// Передача данных в компоненту
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount
    }
};
// Передача методов в компоненту
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
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

