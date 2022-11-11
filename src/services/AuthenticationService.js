import { API_URL_AUTHENTICATION_LOGIN, API_URL_AUTHENTICATION_LOGOUT, API_URL_AUTHENTICATION_REGISTER } from "../constants/apiConstants"

export const login = async (username, password) => {
    let res = await fetch(API_URL_AUTHENTICATION_LOGIN, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    let jsonResult = await res.json();
    // throw(res)
    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}


export const register = (username, email, password) => {
    let res = fetch(API_URL_AUTHENTICATION_REGISTER, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    return res;
};

export const logout = (token) => {
    let res = fetch(API_URL_AUTHENTICATION_LOGOUT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res;
};

export const getUser = () => {
    let username = localStorage.getItem('UserModel');

    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser())
};