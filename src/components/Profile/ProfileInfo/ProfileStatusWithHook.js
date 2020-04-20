import React, {useEffect, useState} from 'react';
import PreloaderMini from "../../common/preloader/PreloaderMini";

const ProfileStatusWithHook = ({textStatus, fetchingStatus, dataUserId, authId, updateStatus}, props) => {
    let [editMode, setEditMode] = useState(false);
    let [statusText, setStatusText] = useState(textStatus);

    useEffect(() => {
        setStatusText(textStatus)
    }, [textStatus]);

    const activateEditMode = () => {
        if (`${dataUserId}` === `${authId}`) {
            setEditMode(true);
            setStatusText(textStatus);
        }
    };

    const deActivateEditMode = () => {
        setEditMode(false);

        if (statusText !== textStatus)
            updateStatus(statusText);
    };

    const onChangeStatus = (e) => {
        setStatusText(e.currentTarget.value);
    };

    return <div>
        <span onDoubleClick={activateEditMode}><b>status</b>:
            {fetchingStatus
                ? <PreloaderMini/>
                : !editMode
                    ? <span onDoubleClick={activateEditMode}>{` ${statusText || '---'}`}</span>
                    : <input
                        autoFocus={true} // Вставка фокуса в компонент
                        onChange={onChangeStatus}
                        onBlur={deActivateEditMode}
                        value={statusText}/>
            }
            </span>
    </div>
};

export default ProfileStatusWithHook;