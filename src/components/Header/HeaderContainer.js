import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/AuthReducer";

class HeaderContainer extends React.Component {
    onClickBtnExit = (e) => {
        this.props.logout();
    };

    render() {
        return <Header {...this.props} onClickBtnExit={this.onClickBtnExit}/>
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.data.id,
        login: state.auth.data.login,
        email: state.auth.data.email,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {logout})(HeaderContainer);