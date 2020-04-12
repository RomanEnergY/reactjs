import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "bc7a9ac8-e9a7-45c6-9e45-e1c4248afc55"
    }
});

export const api = {
    profile: {
        /**
         /**
         * Update status for current authorized user
         * @param newStatus
         * @returns {Promise<T>}
         */
        updateStatus(newStatus) {
            return instance.put(`profile/status`, {
                status: newStatus
            })
                .then(response => {
                    if (response.data.resultCode === 0)
                        return response;
                });
        },

        /**
         * Returns text status of requested user
         * @param userId
         * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
         */
        getStatusByUserId(userId) {
            return instance.get(`profile/status/${userId}`)
                .then(response => {
                    return response;
                });
        },

        /**
         * Returns user profile information
         * @param userId
         * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
         */
        getProfileUserByUserId(userId) {
            return instance.get(`profile/${userId}`)
                .then(response => {
                    return response;
                });
        }
    },

    auth: {
        isAuthMe() {
            return instance.get(`auth/me`)
                .then(response => {
                    return response.data;
                })
        },

        authorizeOnService(email, password, rememberMe = false) {
            return instance.post(`auth/login`, {email, password, rememberMe})
                .then(response => {
                    return response.data;
                })
        },

        logout() {
            return instance.delete(`auth/login`)
                .then(response => {
                    return response.data;
                })
        }

    },

    users: {
        getUsers(currentPage = 1, pageSize = 10) {
            return instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data;
                });
        }
    },

    follow: {
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
    },
};