import * as request from '../services/Requester';
import * as api from "../constants/apiConstants"

export const getAll = () => request.get(api.API_URL_ORDERS_GETALL);

export const getById = (id) => request.get(api.API_URL_ORDERS_GETBYID + '/' + id);

export const create = async (order_data, token) => {
    let response = await fetch(api.API_URL_ORDERS_CREATE, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...order_data })
    });
    console.log(response)
    if (response.ok) {
        return response;
    } else {
        throw response;
    }
}

export const edit = async (order_data, token) => {
    let response = await fetch(api.API_URL_ORDERS_EDIT, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...order_data })
    })
    console.log(response)
    if (response.ok) {
        return response;
    } else {
        throw response.message;
    }
}

export const deleteById = async (id, token) => {
    let response = await fetch(api.API_URL_ORDERS_DELETE + '/' + id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
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

