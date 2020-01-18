import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);
    let newPostElement = React.createRef();

    let onClickButtonNewPost = () => props.onClickButtonNewPost();
    let onChangeNewPost = () => props.onChangeNewPost(newPostElement.current.value);

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea placeholder='Enter your post' onChange={onChangeNewPost} ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onClickButtonNewPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;