import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {getAuthMeData, logout} from "../../redux/AuthReducer";

class HeaderContainer extends React.Component {

    componentDidMount() {

    }

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
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {getAuthMeData, logout})(HeaderContainer);