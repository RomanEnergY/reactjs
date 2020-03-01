import React from 'react';
import Dialogs from "./Dialogs";
import {addMessageAction, updateNewMessagesBodyTextAction} from "../../redux/DialogReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;

/**
 * Метод compose поочередно вызывает вложенные методы, с параметром
 * 1. Вызывает withAuthRedirect(Dialogs), получает данные и далее как параметр передает в следующий метод в сторону начала
 * 2. connect(mapStateToProps, mapDispatchToProps)(return_method_1) и так далее
 */
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);