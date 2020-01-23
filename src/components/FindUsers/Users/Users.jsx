import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios';
import user_png_loc from './../../../assets/images/user1.png'


const Users = (props) => {
        // Костыль от зацикливания, т.к. при вызове тега Users постоянно добавляются данные в props.users, скажим что их не больше 20
        const but = () => {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    debugger
                    props.setUsers(response.data.items);
                });
        };

        const users = props.users.map(u => {
            const followBut = u.followed
                ? <button onClick={() => props.unFollow(u.id)}>UnFollowed</button> // отписаться
                : <button onClick={() => props.follow(u.id)}>Followed</button>; // подписаться

            const photosUser = u.photos.small === null ? user_png_loc : u.photos.small;

            return (
                <div key={u.id}>
                <span>
                    <div>
                        <img className={s.userPhoto} src={photosUser}/>
                    </div>
                    <div>
                        {followBut}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{`id=${u.id}`}</div>
                        <div>{`name=${u.name}`}</div>
                        <div>{`uniqueUrlName=${u.uniqueUrlName}`}</div>
                        <div>{`status=${u.status}`}</div>
                        <div>{`followed=${u.followed}`}</div>
                    </span>
                    <span>
                        <div>{`{u.location.country}`}</div>
                        <div>{`{u.location.city}`}</div>
                    </span>
                </span>
                </div>
            )
        });

        return (
            <div className={s.dialogs}>
                <div className={s.messages}>
                    <button onClick={but}>ClickMe</button>
                    <div>
                        {users}
                    </div>
                </div>
            </div>
        )
    }
;

export default Users;