import React from 'react';
import s from './Users.module.css';
import user_png_loc from "../../../assets/images/user1.png";
import {NavLink} from "react-router-dom";
import PreloaderMini from "../../common/preloader/PreloaderMini";

const Users = (props) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(props.totalUserCount / props.pageSize); i++)
        pages.push(i);

    const btnPages = pages.map(pageNumber => {
        return <button
            className={props.currentPage === pageNumber && s.selectedPage}
            onClick={(e) => props.onPageChanged(pageNumber)}>{pageNumber}</button>
    });

    const users = props.users.map(u => {
        const followingInProgress = props.followingInProgress.some(id => id === u.id); // если в массиве есть пользователей есть данным id (return true), значит по данному id получаем ответ
        const followBut = followingInProgress
            ? <PreloaderMini/>
            : u.followed
                ? <button className={s.follow} onClick={() => props.unFollowUser(u.id)}>UnFollowed</button> // отписаться
                : <button className={s.unFollow} onClick={() => props.followUser(u.id)}>Followed</button>; // подписаться

        const photosUser = u.photos.small === null ? user_png_loc : u.photos.small;

        return (
            <div key={u.id}>

                <span>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img className={s.userPhoto} src={photosUser} alt={photosUser}/>
                        </NavLink>
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
                </span>

            </div>
        )
    });

    return (
        <div className={s.dialogs}>
            <div className={s.messages}>
                <div>
                    {btnPages}
                </div>
                <div className={s.wrapper}>
                    {users}
                </div>
            </div>
        </div>
    )
};

export default Users;