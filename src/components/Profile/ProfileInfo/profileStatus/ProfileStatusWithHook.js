import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {updateStatus} from "../../../../redux/ProfileReducer";
import PreloaderMini from "../../../common/preloader/PreloaderMini";

const ProfileStatusWithHook = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [statusText, setStatusText] = useState(props.status.data);

    const activateEditMode = () => {
        if (`${props.status.userId}` === `${props.authId}`) {
            setEditMode(true);
            setStatusText(props.status.data);
        }
    };

    const deActivateEditMode = () => {
        setEditMode(false);

        if (statusText !== props.status.data)
            props.updateStatus(statusText);
    };

    const onChangeStatus = (e) => {
        setStatusText(e.currentTarget.value);
    };

    if (props.status.fetching)
        return <PreloaderMini/>;


    return <div>
            <span onDoubleClick={activateEditMode}>status:
                {!editMode
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

const mapStateToProps = (state) => {
    return {
        status: state.profilePage.status,
        authId: state.auth.data.id
    }
};

export default compose(
    connect(mapStateToProps, {updateStatus})
)(ProfileStatusWithHook);