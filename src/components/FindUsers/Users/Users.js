import React from 'react';
import style from './Users.module.css';
import user_png_loc from "../../../assets/images/user1.png";
import UserDescription from "./userInfo/userDescription/UserDescription";
import NavLinkToId from "./userInfo/navLinkToId/NavLinkToId";
import ButtonFollow from "./userInfo/followBut/ButtonFollow";
import PaginationItems from "./paginationItems/PaginationItems";

const Users = (props) => {
    const users = props.users.map(user => {
            return (
                <div key={user.id}>
                    <NavLinkToId navLink={`/profile/${user.id}`}
                                 photosUser={!user.photos.small ? user_png_loc : user.photos.small}/>

                    {props.isAuth && <ButtonFollow followingInProgress={props.followingInProgress}
                                                   followUser={props.followUser}
                                                   unFollowUser={props.unFollowUser}
                                                   followId={user.id}
                                                   followed={user.followed}/>}

                    <UserDescription isAuth={props.isAuth} {...user} />
                </div>
            )
        }
    );

    return (
        <div className={style.dialogs}>
            <div className={style.messages}>
                <PaginationItems totalItemsCount={props.totalUserCount}
                                 pageSize={props.pageSize}
                                 currentPage={props.currentPage}
                                 onPageChanged={props.onPageChanged}/>

                <div className={style.wrapper}>
                    {users}
                </div>
            </div>
        </div>
    )
};

export default Users;