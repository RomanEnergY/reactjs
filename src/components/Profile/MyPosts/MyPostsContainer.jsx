import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {TextArea} from "../../common/FormsComntrols/FormsControls";
import {connect} from "react-redux";
import {addNewPost} from "../../../redux/ProfileReducer";

class MyPostsContainer extends React.PureComponent {

    onSubmit = (formData) => {
        this.props.addNewPost(formData.messagePost);
    };

    render() {
        let postsElements = this.props.posts.map(p =>
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <PostReduxForm onSubmit={this.onSubmit}/>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        )
    }
}

const maxLength10 = maxLengthCreator(10);

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

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: (message) => dispatch(addNewPost(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer);