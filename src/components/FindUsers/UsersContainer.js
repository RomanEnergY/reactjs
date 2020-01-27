import React from 'react';
import {connect} from "react-redux";
import * as mapDispatch from "../../redux/UsersReducer";
import * as axios from "axios";
import Users from "./Users/Users";
import preloader from "./../../assets/images/preloader.svg"
import Preloader from "../common/preloader/Preloader";

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
        this.props.setFetching(true);
        axios.get("https://social-network.samuraijs.com/api/1.0/users" +
            `?page=${pageNumber}` +
            `&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
                this.props.setFetching(false);
            });
    };

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.getUserPageNumber(pageNumber);
    };

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users
                    totalUserCount={this.props.totalUserCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    unFollow={this.props.unFollow}
                    follow={this.props.follow}
                    onPageChanged={this.onPageChanged}/>
            }
        </>
    }
}

// Передача данных в компоненту
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount,
        isFetching: state.usersPage.isFetching
    }
};
// Передача методов в компоненту
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => dispatch(mapDispatch.followAC(userId)),
        unFollow: (userId) => dispatch(mapDispatch.unFollowAC(userId)),
        setUsers: (users) => dispatch(mapDispatch.setUsersAC(users)),
        setCurrentPage: (currentPage) => dispatch(mapDispatch.setCurrentPageAC(currentPage)),
        setTotalUserCount: (totalUserCount) => dispatch(mapDispatch.setTotalUserCountAC(totalUserCount)),
        setFetching: (fetching) => dispatch(mapDispatch.setFetchingAC(fetching))
    }
};
// Создание и настройка коннект данных, методов и компаненты
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

