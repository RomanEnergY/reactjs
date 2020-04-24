import React, {useEffect, useState} from 'react';
import PreloaderMini from "../../common/preloader/PreloaderMini";

const ProfileStatusWithHook = ({statusData, statusFetching, isAuthMe, updateStatus}, ...props) => {
    let [editMode, setEditMode] = useState(false);
    let [statusText, setStatusText] = useState(statusData);

    useEffect(() => {
        setStatusText(statusData)
    }, [statusData]);

    const activateEditMode = () => {
        if (isAuthMe) {
            setEditMode(true);
            setStatusText(statusData);
        }
    };

    const deActivateEditMode = () => {
        setEditMode(false);

        if (statusText !== statusData)
            updateStatus(statusText);
    };

    const onChangeStatus = (e) => {
        setStatusText(e.currentTarget.value);
    };

    return <div>
        <span onDoubleClick={activateEditMode}><b>status</b>:
            {statusFetching
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