import React, {useEffect, useState} from 'react';
import PreloaderMini from "../../../common/preloader/PreloaderMini";

const ProfileStatusWithHook = ({status, authId, updateStatus}, props) => {
    let [editMode, setEditMode] = useState(false);
    let [statusText, setStatusText] = useState(status.textStatus);

    useEffect(() => {
        setStatusText(status.textStatus)
    }, [status.textStatus]);

    const activateEditMode = () => {
        if (`${status.data.userId}` === `${authId}`) {
            setEditMode(true);
            setStatusText(status.textStatus);
        }
    };

    const deActivateEditMode = () => {
        setEditMode(false);

        if (statusText !== status.textStatus)
            updateStatus(statusText);
    };

    const onChangeStatus = (e) => {
        setStatusText(e.currentTarget.value);
    };

    return <div>
        <span onDoubleClick={activateEditMode}><b>status</b>:
            {status.fetching
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