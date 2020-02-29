import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "bc7a9ac8-e9a7-45c6-9e45-e1c4248afc55"
    }
});


export const api = {
    getAuthMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },

    getProfileUser(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response;
            });
    },

    /**
     * Получение данных о пользователях
     * @param currentPage
     * @param pageSize
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    unFollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response.data;
                }
            });
    },

    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response.data;
                }
            });
    }
};