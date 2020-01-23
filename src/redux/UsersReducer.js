const initialState = {
    users: [
        // {
        //     id: '1',
        //     img: 'https://www.pinclipart.com/picdir/middle/187-1870879_meet-the-board-user-stock-clipart.png',
        //     followed: true,
        //     fullName: 'Roman',
        //     status: 'Status 1',
        //     location: {city: 'Saint-Petersburg', country: 'Russia'}
        // },
        // {
        //     id: '2',
        //     img: 'https://www.pinclipart.com/picdir/middle/187-1870879_meet-the-board-user-stock-clipart.png',
        //     followed: false,
        //     fullName: 'Jenya',
        //     status: 'Status 2',
        //     location: {city: 'Moscow', country: 'Russia'}
        // },
        // {
        //     id: '3',
        //     img: 'https://img1.freepng.ru/20180702/itr/kisspng-senior-management-computer-icons-clip-art-women-cl-5b39d03b5b6775.5347276915305155153744.jpg',
        //     followed: false,
        //     fullName: 'Andrey',
        //     status: 'Status 3',
        //     location: {city: 'Belarus', country: 'Minsk'}
        // }
    ]
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {...state, users: [...state.users, ...action.users]}; // Поверхностная копия, в users поверхностно скопировать users и добавить users из action

        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id)
                        return {
                            ...u,
                            followed: true
                        };

                    return u;
                }),
            };

        case 'UN_FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id)
                        return {
                            ...u,
                            followed: false
                        };

                    return u;
                }),
            };

        default:
            return state;
    }
};

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';
let SET_USERS = 'SET_USERS';

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unFollowAC = (userId) => ({type: UN_FOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});