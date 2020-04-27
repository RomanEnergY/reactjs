import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "bc7a9ac8-e9a7-45c6-9e45-e1c4248afc55"
    }
});

export const profileAPI = {
    /**
     * method: PUT
     * https://social-network.samuraijs.com/api/1.0/profile/status
     * status: newStatus
     *
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
     * method: GET
     * https://social-network.samuraijs.com/api/1.0/profile/status/5805
     *
     * Returns text status of requested user
     * @param userId
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    getTextStatusByUserId(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response;
            });
    },

    /**
     * method: GET
     * https://social-network.samuraijs.com/api/1.0/profile/5805
     *
     * Returns user profile information
     * @param userId
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    getProfileUserByUserId(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response;
            });
    },

    /**
     * method: PUT
     * https://social-network.samuraijs.com/api/1.0/profile
     *
     * @param statusDataContacts
     * @returns {Promise<T>}
     */
    updateStatusDataContacts(statusDataContacts) {
        return instance.put(`profile`, statusDataContacts)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response;
                } else {
                    return Promise.reject({...getErrorResult(response.data.messages)});
                }
            });
    },

    /**
     * // method: PUT
     * https://social-network.samuraijs.com/api/1.0/profile/photo
     *
     * @param photo
     * @returns {Promise<T>}
     */
    updateProfilePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response;
                } else {
                    return Promise.reject(response);
                }
            })
            .catch(response => {
                return Promise.reject(response);
            });
    }
};

export const authAPI = {
    /**
     * // method: GET
     * https://social-network.samuraijs.com/api/1.0/auth/me
     *
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    isAuthMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },

    /**
     * // method: POST
     * https://social-network.samuraijs.com/api/1.0/auth/login
     *
     * @param email
     * @param password
     * @param rememberMe
     * @param captcha
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    authorizeOnService(email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                if (response.data.resultCode === 0) {
                    return Promise.resolve(true);

                } else if (response.data.resultCode === 10) {
                    return authAPI.getCaptchaUrl()
                        .then(captcha => {
                            return Promise.reject({
                                response: response.data.messages[0],
                                captcha
                            });
                        })

                } else {
                    return Promise.reject({
                        response: response.data.messages[0]
                    });
                }
            })
    },

    /**
     * method: DELETE
     * https://social-network.samuraijs.com/api/1.0/auth/login
     *
     * @returns {Promise}
     */
    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
    }
};

export const securityAPI = {
    /**
     * method: GET
     * https://social-network.samuraijs.com/api/1.0/security/get-captcha-url
     *
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data.url;
            })
    }
};

export const userAPI = {
    /**
     * method: GET
     * https://social-network.samuraijs.com/api/1.0/users?page=1&count=10
     *
     * @param currentPage
     * @param pageSize
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    }
};

export const followAPI = {
    /**
     * method: DELETE
     * https://social-network.samuraijs.com/api/1.0/follow/1
     *
     * @param id
     * @returns {Q.Promise<unknown>}
     */
    unFollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response.data;
                }
            });
    },

    /**
     * method: POST
     * https://social-network.samuraijs.com/api/1.0/follow/1
     *
     * @param id
     * @returns {Q.Promise<any> | * | void | PromiseLike<any>}
     */
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response.data;
                }
            });
    }
};

/**
 * Метод проверяет наличие по шаблону значения данных и добавляет key: value в объект result
 * Пример массива text:
 * text = [
 *      "The data of city (City)",
 *      "The data of user.name (User->Name)",
 *      "The data of user.surname (User->Surname)",
 * }
 *
 * возращаемый объект
 * returns = {
 *     city: "The data of city ",
 *     user: {
 *          name: "The data of user.name ",
 *          surname: "The data of user.surname "
 *     }
 * }
 * @param text входной массив строк
 * @returns {Object}
 */
const getErrorResult = (text) => {
    let result = {};
    text.forEach(data => {
        let getMatchData = (pattern) => {
            return data.match(new RegExp(pattern, "i"));
        };

        let pref = '->';
        let matchUp = getMatchData(`(.+)(\\(.+)(${pref})(.+)`);
        let match = getMatchData(`(.+)(\\(.+)(.+)`);

        if (matchUp) {
            let nameKeyUpLevel = matchUp[2][1].toLowerCase() + matchUp[2].substring(2);
            let key = matchUp[4][0].toLowerCase() + matchUp[4].substring(1, matchUp[4].length - 1);
            let value = matchUp[1];

            result = {
                ...result,
                [nameKeyUpLevel]: {
                    ...result[nameKeyUpLevel],
                    [key]: value
                }
            };
        } else {
            if (match) {
                let key = match[2][1].toLowerCase() + match[2].substring(2);
                let value = match[1];

                result = {
                    ...result,
                    [key]: value
                };
            }
        }
    });
    return result;
};