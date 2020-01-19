import React from 'react';
import Dialogs from "./Dialogs";
import {addMessageAction, updateNewMessagesBodyTextAction} from "../../redux/dialogReducer";
import {connect} from "react-redux";

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

// Создание и настройка коннект данных, методов и компаненты
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;