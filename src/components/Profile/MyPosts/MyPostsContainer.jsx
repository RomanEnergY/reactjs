import React from 'react';
import MyPosts from "./MyPosts";
import {addPost, updateNewPostText} from "../../../redux/ProfileReducer";
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
        onClickButtonNewPost: () => dispatch(addPost()),
        onChangeNewPost: (text) => dispatch(updateNewPostText(text))
    }
};

// Создание и настройка коннект данных, методов и компаненты
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;