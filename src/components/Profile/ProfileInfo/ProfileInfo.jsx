import React from 'react';
import ProfileImg from "./ProfileImg";
import ProfileUserName from "./ProfileUserName";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import ProfileContactDataWithHook from "./ProfileContactDataWithHook";

const ProfileInfo = React.memo(({photo, status, profile, isAuthMe, setProfilePhoto, updateStatus, updateContactForm, dispatchErrorSubmitData}, ...props) => {
    return (
        <div>
            <ProfileImg photo={photo} isAuthMe={isAuthMe} setProfilePhoto={setProfilePhoto}/>
            <ProfileUserName fullName={profile.data.fullName}/>
            <ProfileStatusWithHook statusData={status.data}
                                   statusFetching={status.fetching}
                                   isAuthMe={isAuthMe}
                                   updateStatus={updateStatus}/>

            <ProfileContactDataWithHook profileData={profile.data}
                                        profileFetching={profile.fetching}
                                        isAuthMe={isAuthMe}
                                        updateContactForm={updateContactForm}
                                        dispatchErrorSubmitData={dispatchErrorSubmitData}/>
        </div>
    )
});

export default ProfileInfo;