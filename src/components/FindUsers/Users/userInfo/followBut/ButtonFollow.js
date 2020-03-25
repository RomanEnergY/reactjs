import PreloaderMini from "../../../../common/preloader/PreloaderMini";
import style from "./ButtonFollow.module.css";
import React from "react";

/**
 *
 * @param followingInProgress массив данных id объектов прогресса запроса
 * @param followId id объект
 * @param followed состояние объекта (true/false)
 * @param followUser метод перехода id объект в состояние follow
 * @param unFollowUser метод перехода id объект в состояние unFollow
 * @returns {*}
 * @constructor
 */
const ButtonFollow = ({followingInProgress, followId, followed, followUser, unFollowUser}) => {
    const follow = followingInProgress.some(id => id === followId) // если в массиве пользователей есть данным id (return true), значит по данному id получаем ответ
        ? <PreloaderMini/>
        : followed
            ? <button className={style.unFollow} onClick={() => unFollowUser(followId)}>UnFollowed</button> // отписаться
            : <button className={style.follow} onClick={() => followUser(followId)}>Followed</button>; // подписаться

    return(
        <div>
            {follow}
        </div>
    )
};

export default ButtonFollow;