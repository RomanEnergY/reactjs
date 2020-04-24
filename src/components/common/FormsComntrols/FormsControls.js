import React from "react";
import styles from './FormsControls.module.css';
import PreloaderMini from "../preloader/PreloaderMini";
import {connect} from "react-redux";

export const TextArea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}

        </div>
    )
};

export const KeyToInputComponent = ({input, meta, ...props}) => {
    const hasError = meta.error;
    const changed = meta.initial !== input.value;
    let classNameInput = hasError ? styles.inputError : changed ? styles.changed : "";
    debugger

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <b>{props.label} </b>
                {props.fetching
                    ? <PreloaderMini/>
                    : <>
                        <input className={classNameInput} {...input} {...props}/>
                        {hasError && <span className={styles.spanError}>{meta.error}</span>}
                    </>
                }
            </div>
        </div>
    )
};

export const KeyToInput = connect((state) => {
    return {
        fetching: state.profilePage.profile.fetching
    }
})(KeyToInputComponent);