import React from 'react';
import MyPosts from "./MyPosts";
import {addPostAction, updateNewPostTextAction} from "../../../redux/ProfileReducer";
import {connect} from "react-redux";

// Передача данных
const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

// Передача методов
const mapDispatchToProps = (dispatch) => {
    return {
        onClickButtonNewPost: () => dispatch(addPostAction()),
        onChangeNewPost: (text) => dispatch(updateNewPostTextAction(text))
    }
};

// Создание и настройка коннект данных, методов и компаненты
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;