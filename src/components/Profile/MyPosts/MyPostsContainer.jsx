import React from 'react';
import MyPosts from "./MyPosts";
import {addPostAction, updateNewPostTextAction} from "../../../redux/profileReducer";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () => {
    return <StoreContext.Consumer>
        {(store) => {
            return <MyPosts
                posts={store.getState().profilePage.posts}
                newPostText={store.getState().profilePage.newPostText}
                onClickButtonNewPost={() => store.dispatch(addPostAction())}
                onChangeNewPost={(text) => store.dispatch(updateNewPostTextAction(text))}
            />
        }}
    </StoreContext.Consumer>

};

export default MyPostsContainer;