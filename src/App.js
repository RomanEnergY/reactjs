import React from 'react';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/FindUsers/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import IndexContainer from "./components/IndexContainer";

const App = (props) => {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <NavBar/>
            <div className='app-wrapper-content'>
                <Route exact path='/' render={() => <IndexContainer/>}/>
                <Route path='/login' render={() => <LoginContainer/>}/>
                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
            </div>
        </div>
    )
};

export default App;