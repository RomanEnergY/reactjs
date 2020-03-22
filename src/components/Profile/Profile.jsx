import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import user_png_loc from "../../assets/images/user1.png";

const Profile = React.memo((props) => {
    return (
        <div>
            <ProfileInfo photo={props.data.photos.large ? props.data.photos.large : user_png_loc}
                         fullName={props.data.fullName}/>
            <MyPostsContainer/>
        </div>
    )
});

export default Profile;