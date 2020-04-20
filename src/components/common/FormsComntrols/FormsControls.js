import React from "react";
import styles from './FormsControls.module.css';

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

export const KeyToInput = ({input, meta, handlerValid, ...props}) => {
    const hasError = meta.error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <b>{props.data}</b>
                <input className={hasError ? styles.inputError : ""} {...input} {...props}/>
                {hasError && <span className={styles.spanError}>{meta.error}</span>}
            </div>
        </div>
    )
};