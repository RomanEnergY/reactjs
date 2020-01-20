import React from 'react';
import s from './Users.module.css';

const Users = (props) => {
        // Костыль от зацикливания, т.к. при вызове тега Users постоянно добавляются данные в props.users, скажим что их не больше 20
        if (props.users.length < 20) {
            props.setUsers([
                {
                    id: '4',
                    img: 'https://www.pinclipart.com/picdir/middle/187-1870879_meet-the-board-user-stock-clipart.png',
                    followed: true,
                    fullName: 'Katya',
                    status: 'Status 4',
                    location: {city: 'Saint-Petersburg', country: 'Russia'}
                },
                {
                    id: '5',
                    img: 'https://www.pinclipart.com/picdir/middle/187-1870879_meet-the-board-user-stock-clipart.png',
                    followed: true,
                    fullName: 'Sergei',
                    status: 'Status 5',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: '6',
                    img: 'https://img1.freepng.ru/20180702/itr/kisspng-senior-management-computer-icons-clip-art-women-cl-5b39d03b5b6775.5347276915305155153744.jpg',
                    followed: true,
                    fullName: 'Vlad',
                    status: 'Status 6',
                    location: {city: 'Belarus', country: 'Minsk'}
                },
                {
                    id: '7',
                    img: 'https://img1.freepng.ru/20180702/itr/kisspng-senior-management-computer-icons-clip-art-women-cl-5b39d03b5b6775.5347276915305155153744.jpg',
                    followed: false,
                    fullName: 'Timur',
                    status: 'Status 7',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: '8',
                    img: 'https://img1.freepng.ru/20180702/itr/kisspng-senior-management-computer-icons-clip-art-women-cl-5b39d03b5b6775.5347276915305155153744.jpg',
                    followed: false,
                    fullName: 'Oleg',
                    status: 'Status 8',
                    location: {city: 'Saint-Petersburg', country: 'Russia'}
                },
                {
                    id: '9',
                    img: 'https://www.pinclipart.com/picdir/middle/187-1870879_meet-the-board-user-stock-clipart.png',
                    followed: true,
                    fullName: 'Petr',
                    status: 'Status 9',
                    location: {city: 'Belarus', country: 'Minsk'}
                },
            ]);
        }

        const users = props.users.map(u => {
            const fol = u.followed
                ? <button onClick={() => props.unFollow(u.id)}>UnFollowed</button> // отписаться
                : <button onClick={() => props.follow(u.id)}>Followed</button>; // подписаться
            return (
                <div key={u.id}>
                <span>
                    <div>
                        <img className={s.userPhoto} src={u.img}/>
                    </div>
                    <div>
                        {fol}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
                </div>
            )
        });

        return (
            <div className={s.dialogs}>
                <div className={s.messages}>
                    <div>
                        {users}
                    </div>
                </div>
            </div>
        )
    }
;

export default Users;