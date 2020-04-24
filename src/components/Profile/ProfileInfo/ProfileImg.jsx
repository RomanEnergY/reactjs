import React from 'react';
import style from '../Profile.module.css';
import user_png_loc from "../../../assets/images/user1.png";
import Preloader from "../../common/preloader/Preloader";

const ProfileImg = ({isAuthMe, setProfilePhoto, photo}) => {
    const onMainPhotoSelected = (e) => {
        if (e.target.files[0] !== null) {
            setProfilePhoto(e.target.files[0]);
        }
    };

    if (photo.fetching)
        return <Preloader/>;

    const img = photo.photos.large
        ? photo.photos.large
        : user_png_loc;

    return (
        <div>
            <img className={style.profilePhoto}
                 src={img}
                 alt={""}/>
            {isAuthMe && <input type={"file"} onChange={onMainPhotoSelected}/>}
            {photo.error && <div className={style.formError}>{photo.error}</div>}
        </div>
    )
};

export default ProfileImg;