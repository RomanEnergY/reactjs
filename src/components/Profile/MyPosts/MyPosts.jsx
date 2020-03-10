import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Element} from "../../common/FormsComntrols/FormsControls";

const MyPosts = (props) => {

    let postsElements = props.posts.map(p =>
        <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const onSubmit = (formData) => {
        console.log(formData);

        props.addNewPost(formData.messagePost);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

const maxLength10 = maxLengthCreator(10);
const TextArea = Element("textarea");
const PostForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field
                    name={'messagePost'}
                    component={TextArea}
                    placeholder={'Enter your post'}
                    validate={[required, maxLength10]}/>
                </div>
                <div>
                    <button>add New Message Post</button>
                </div>
            </form>
        </div>
    )
};

const PostReduxForm = reduxForm({form: 'addNewPost'})(PostForm);

export default MyPosts;