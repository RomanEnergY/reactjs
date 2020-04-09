import React from 'react';
import store from "./redux/ReduxStore";
import Preloader from "./components/common/preloader/Preloader";
import './App.css';
import NavBar from './components/Navbar/NavBar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/FindUsers/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import IndexContainer from "./components/IndexContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/AppReducer";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));

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
                            <Route path='/login' render={withSuspense(LoginContainer)}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
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
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <MainApp/>
            </Provider>
        </BrowserRouter>
    )
};

export default AppContainer;