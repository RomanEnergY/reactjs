import React from 'react';
import s from './Users.module.css';
import user_png_loc from "../../../assets/images/user1.png";

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUserCount / props.pageSize); // Делим всх пользователей на станицы и округляем их в большую сторону
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const users = props.users.map(u => {
        const followBut = u.followed
            ? <button onClick={() => props.unFollow(u.id)}>UnFollowed</button> // отписаться
            : <button onClick={() => props.follow(u.id)}>Followed</button>; // подписаться

        const photosUser = u.photos.small === null ? user_png_loc : u.photos.small;

        return (
            <div key={u.id}>
                <span>
                    <div>
                        <img className={s.userPhoto} src={photosUser} alt={photosUser}/>
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
                <div>
                    {pages.map(p => {
                        return <button
                            className={props.currentPage === p && s.selectedPage}
                            onClick={(e) => {
                                props.onPageChanged(p)
                            }}>{p}</button>
                    })}
                </div>
                <div>
                    {users}
                </div>
            </div>
        </div>
    )
};

export default Users;