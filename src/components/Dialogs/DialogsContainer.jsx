import React from 'react';
import Dialogs from "./Dialogs";
import {addMessageAction, updateNewMessagesBodyTextAction} from "../../redux/dialogReducer";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
    return <StoreContext.Consumer>
        {store => {
            return <Dialogs
                dialogs={store.getState().dialogPage.dialogs}
                messages={store.getState().dialogPage.messages}
                newMessagesBody={store.getState().dialogPage.newMessagesBody}
                onClickButton={() => store.dispatch(addMessageAction())}
                onChange={(text) => store.dispatch(updateNewMessagesBodyTextAction(text))}
            />
        }}
    </StoreContext.Consumer>
};

export default DialogsContainer;