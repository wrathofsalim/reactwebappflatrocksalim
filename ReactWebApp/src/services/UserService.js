import * as request from '../services/Requester';
import * as api from "../constants/apiConstants"

export const getAll = () => request.get(api.API_URL_USER_GETALL);

export const getById = (id) => request.get(api.API_URL_USER_GETBYID + '/' + id);

export const create = async (product_data, token) => {
    let response = await fetch(api.API_URL_USER_CREATE, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...product_data })
    });

    if (response.ok) {
        return response;
    } else {
        throw response;
    }
}

export const edit = async (product_data, token) => {
    let response = await fetch(api.API_URL_USER_EDIT, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...product_data })
    })
    if (response.ok) {
        return response;
    } else {
        throw response.message;
    }
}

export const deleteById = async (id, token) => {
    let response = await fetch(api.API_URL_USER_DELETE + '/' + id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        // body: JSON.stringify({ id })
    });
    if (response.ok) {
        return response;
    } else {
        throw response.message;
    }
}


export const activateById = async (id, token) => {
    let response = await fetch(api.API_URL_USER_ACTIVATE + '/' + id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        // body: JSON.stringify({ id })
    });
    if (response.ok) {
        return response;
    } else {
        throw response.message;
    }
}


export const getUser = () => {
    let username = localStorage.getItem('UserModel');

    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser())
};

