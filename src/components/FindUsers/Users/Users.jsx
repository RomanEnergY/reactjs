import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios';
import user_png_loc from './../../../assets/images/user1.png'

class Users extends React.Component {

    // по умлчанию
    // constructor(props) {
    //     super(props);
    // }

    /**
     * Метод вызывается при первой отрисовки (вмонтировании) html-разметки на станицу
     * вмонтирование осуществляется только после создания нового объекта, далее осущетвляется обновление компоненты
     */
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users" +
            `?page=${this.props.currentPage}` +
            `&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
            });
    }

    componentWillUnmount() {

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        // Передаем pageNumber т.к. еще props новые к нам не пришли... должен оработать данный метод до конца
        axios.get("https://social-network.samuraijs.com/api/1.0/users" +
            `?page=${pageNumber}` +
            `&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
            });
    };

    render() {
        const pagesCount = Math.ceil(this.props.totalUserCount / this.props.pageSize); // Делим всх пользователей на станицы и округляем их в большую сторону
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        const users = this.props.users.map(u => {
            const followBut = u.followed
                ? <button onClick={() => this.props.unFollow(u.id)}>UnFollowed</button> // отписаться
                : <button onClick={() => this.props.follow(u.id)}>Followed</button>; // подписаться

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
                    <div>
                        {pages.map(p => {
                            return <button
                                className={this.props.currentPage === p && s.selectedPage}
                                onClick={(e) => {
                                    this.onPageChanged(p)
                                }}>{p}</button>
                        })}
                    </div>
                    <div>
                        {users}
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;