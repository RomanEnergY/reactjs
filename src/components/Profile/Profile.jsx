import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/preloader/Preloader";

const Profile = (props) => {
    if (!props.data) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileInfo photo={props.data.photos.small}
                         aboutMe={props.data.aboutMe}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;