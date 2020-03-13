import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthMeData} from "../redux/AuthReducer";
import Preloader from "./common/preloader/Preloader";

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
        if (this.props.isFetching)
            return <Preloader/>;

        if (!this.props.isAuth)
            return <Redirect to='/login'/>;
        else
            return <Redirect to={`/profile/${this.props.id}`}/>

    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.data.id,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {getAuthMeData})(IndexContainer);