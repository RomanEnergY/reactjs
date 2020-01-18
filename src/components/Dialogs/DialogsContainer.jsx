import React from 'react';
import Dialogs from "./Dialogs";
import {addMessageAction, updateNewMessagesBodyTextAction} from "../../redux/dialogReducer";

const DialogsContainer = (props) => {
    debugger

    return (
        <Dialogs
            dialogs={props.store.getState().dialogPage.dialogs}
            messages={props.store.getState().dialogPage.messages}
            newMessagesBody={props.store.getState().dialogPage.newMessagesBody}
            onClickButton={() => props.store.dispatch(addMessageAction())}
            onChange={(text) => props.store.dispatch(updateNewMessagesBodyTextAction(text))}
        />
    )
};

export default DialogsContainer;