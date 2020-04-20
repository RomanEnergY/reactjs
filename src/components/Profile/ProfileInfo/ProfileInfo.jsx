import React from 'react';
import ProfileImg from "./ProfileImg";
import ProfileUserName from "./ProfileUserName";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import ProfileContactDataWithHook from "./ProfileContactDataWithHook";

const ProfileInfo = React.memo(({photo, fullName, status, authId, updateStatus, updateContactForm}, props) => {
    return (
        <div>
            <ProfileImg photo={photo}/>
            <ProfileUserName fullName={fullName}/>
            <ProfileStatusWithHook textStatus={status.textStatus}
                                   fetchingStatus={status.fetching}
                                   dataUserId={status.data.userId}
                                   authId={authId}
                                   updateStatus={updateStatus}/>

            <ProfileContactDataWithHook data={status.data}
                                        authId={authId}
                                        updateContactForm={updateContactForm}/>
        </div>
    )
});

export default ProfileInfo;