import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import * as axios from "axios";
import {setFetching, setAuthUserData} from "../../redux/AuthReducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.setFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                    if (response.data.resultCode === 0) {
                        this.props.setAuthUserData(response.data.data, response.data.messages);
                    }
                    this.props.setFetching(false);
                }
            );
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.data.login,
        email: state.auth.data.email,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {
    setAuthUserData,
    setFetching

})(HeaderContainer);