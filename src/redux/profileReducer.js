const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const addPostAction = () => ({type: ADD_POST});
export const updateNewPostTextAction = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    newPostText: ''
};

/*
Внедрение копирования данных требуется т.к. нельзя менять основные данные (принцип чистой функции), только копирование
stateCopy - это копия state и в данном объекте мы меняем данные, которые изменились, далее его возвращаем
перерисовка данных не производится т.к. фактически state === return_state, хотя при этом изменения присутствуют
1. state === return_state т.к. фактически адреса в памяти совпадают, требуется копирование данных для изменения адреса в памяти
2.
 */
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {

            if (state.newPostText.length > 0) {
                let newPost = {
                    id: state.posts.length,
                    message: state.newPostText,
                    likesCount: 0
                };

                let stateCopy = {...state}; // поверхностная копия (surface of copy) объекта
                stateCopy.posts = [...state.posts]; // копирование непосредственно данных мессива
                stateCopy.posts.push(newPost);
                stateCopy.newPostText = '';

                return stateCopy;
            }
            return state;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;

            return stateCopy;
        }
        default:
            return state;
    }
};
