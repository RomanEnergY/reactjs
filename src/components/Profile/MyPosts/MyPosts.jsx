import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostAction, updateNewPostTextAction} from "../../../redux/state";

const MyPosts = (props) => {
    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        // props.addPost();
        props.dispatch(addPostAction());
    };

    let onPostChange = () => {
        // debugger;
        let text = newPostElement.current.value;
        // props.updateNewPostText(text);
        props.dispatch(updateNewPostTextAction(text));
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;