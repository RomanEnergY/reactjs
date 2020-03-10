import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p =>
        <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const onSubmit = (formData) => {
        props.addNewPost(formData.message);
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

const PostForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field component={'input'} name={'message'} placeholder={'Enter your post'}/></div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </div>
    )
};


const PostReduxForm = reduxForm({form: 'addNewPost'})(PostForm);

export default MyPosts;