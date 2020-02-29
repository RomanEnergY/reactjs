import React from 'react';
import Dialogs from "./Dialogs";
import {addMessageAction, updateNewMessagesBodyTextAction} from "../../redux/DialogReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

// Передача данных
const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        newMessagesBody: state.dialogPage.newMessagesBody
    }
};

// Передача методов
const mapDispatchToProps = (dispatch) => {
    return {
        onClickButton: () => dispatch(addMessageAction()),
        onChange: (text) => dispatch(updateNewMessagesBodyTextAction(text))
    }
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;