import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "./common/preloader/Preloader";
import {compose} from "redux";

/**
 * Контейнер осуществляет запрос на сервер залогинен ли пользователь:
 * если да, перенапрявляем его на страницу профель
 * если нет на страницу логин
 */
class IndexContainer extends React.Component {
    componentDidMount() {
        // Пример програмного перехода, для него требуется обернуть компаненту методом withRouter lib "react-router-dom"
        if (!this.props.isFetching) {
            this.props.history.push(`/profile/${this.props.id}`);
        }
    }

    render() {
        return <Preloader/>;
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.data.id,
        isFetching: state.auth.isFetching
    }
};

export default compose(
    connect(mapStateToProps, null),
    withRouter,
)(IndexContainer);