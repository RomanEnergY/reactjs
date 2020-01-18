import React from 'react';
import MyPosts from "./MyPosts";
import {addPostAction, updateNewPostTextAction} from "../../../redux/profileReducer";

const MyPostsContainer = (props) => {
    return (
        <MyPosts
            posts={props.store.getState().profilePage.posts}
            newPostText={props.store.getState().profilePage.newPostText}
            onClickButtonNewPost={() => props.store.dispatch(addPostAction())}
            onChangeNewPost={(text) => props.store.dispatch(updateNewPostTextAction(text))}
        />
    )
};

export default MyPostsContainer;