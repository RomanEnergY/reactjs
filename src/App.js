import React from 'react';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/FindUsers/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginContainer from "./components/Login/LoginContainer";
import IndexContainer from "./components/IndexContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/AppReducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/ReduxStore";

class App extends React.Component {
    componentDidMount() {
        this.props.initializedApp();
    }


    render() {
        return (<div className='app-wrapper'>
                <HeaderContainer/>
                {!this.props.initialized
                    ? <Preloader/>
                    : <>
                        <NavBar/>
                        <div className='app-wrapper-content'>
                            <Route exact path='/' render={() => <IndexContainer/>}/>
                            <Route path='/login' render={() => <LoginContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                        </div>
                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
};

const MainApp = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(App);

const AppContainer = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MainApp />
            </Provider>
        </BrowserRouter>
    )
};

export default AppContainer;