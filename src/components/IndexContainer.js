import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthMeData} from "../redux/AuthReducer";

/**
 * Контейнер осуществляет запрос на сервер залогинен ли пользователь:
 * если да, перенапрявляем его на страницу профель
 * если нет на страницу логин
 */
class IndexContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isFetching)
            this.props.getAuthMeData();
    }

    render() {
        return !this.props.id && !this.props.login
            ? <Redirect to='/login'/>
            : <Redirect to={`/profile/${this.props.id}`}/>

    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.data.id,
        login: state.auth.data.login,
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {getAuthMeData})(IndexContainer);