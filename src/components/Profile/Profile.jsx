import React from 'react';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileImg from "./ProfileInfo/ProfileImg";
import ProfileUserName from "./ProfileInfo/ProfileUserName";
import ProfileStatusWithHook from "./ProfileInfo/profileStatus/ProfileStatusWithHook";
import ProfileStatusDataWithHook from "./ProfileInfo/profileStatus/ProfileStatusDataWithHook";

const Profile = React.memo((props) => {
    return (
        <div>
            <ProfileImg photo={props.status.data.photos.large}/>
            <ProfileUserName fullName={props.status.data.fullName}/>
            <ProfileStatusWithHook status={props.status} authId={props.authId} updateStatus={props.updateStatus}/>
            <ProfileStatusDataWithHook {...props}/>
            <MyPostsContainer/>
        </div>
    )
});

export default Profile;