import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageAction, updateNewMessagesBodyTextAction} from "../../redux/state";

const Dialogs = (props) => {
    const dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    const messagesElements = props.state.messages.map(m => <Message message={m.message}/>);
    const newPostElement = React.createRef();

    const addMessage = () => props.dispatch(addMessageAction());
    const onMessageChange = () => props.dispatch(updateNewMessagesBodyTextAction(newPostElement.current.value));

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea placeholder='Enter your message' onChange={onMessageChange} ref={newPostElement}
                                   value={props.state.newMessagesBody}/>
                    </div>
                    <div>
                        <button onClick={addMessage}>Add post</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;