import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {
    const dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    const messagesElements = props.messages.map(m => <Message key={m.id} message={m.message}/>);

    let onSubmit = (dataForm) => {
        props.addMessage(dataForm.messageDialog);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <DialogReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

const DialogForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field name={'messageDialog'} component={'input'} placeholder={'Enter your message'}/></div>
                <div>
                    <button>Send</button>
                </div>
            </form>
        </div>
    )
};

const DialogReduxForm = reduxForm({form: 'addNewMessage'})(DialogForm);

export default Dialogs;