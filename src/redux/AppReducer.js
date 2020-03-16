import {getAuthMeData} from "./AuthReducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

const initializedSuccess = () => ({type: INITIALIZE_SUCCESS});

const initialState = {
    initialized: false, // флаг инициализации приложения
};


export const initializedApp = () => {
    return (dispatch) => {
        // Асинхронное выполнение dispatch и далее получение данных об выполнении
        let promiseDispatchResult = dispatch(getAuthMeData());
        // let dispatchResult1 = dispatch(...());
        // let dispatchResult2 = dispatch(...());
        // let dispatchResult3 = dispatch(...());

        // Массив Promises ссылки на данные выполнения
        let promises = [
            promiseDispatchResult,
            // dispatchResult1,
            // dispatchResult2,
            // dispatchResult3
        ];

        // Когда весь массив Promises выполнится, выполнить колбек
        Promise.all(promises).then(() => {
            dispatch(initializedSuccess());
        });

        // Выполнить колбек промиса
        // promiseDispatchResult.then((data) => {
        //     if (data)
        //         dispatch(initializedSuccess());
        // });
    };
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};
