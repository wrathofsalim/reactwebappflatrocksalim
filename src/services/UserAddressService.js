import * as request from '../services/Requester';
import * as api from "../constants/apiConstants"


export const getAll = () => request.get(api.API_URL_USERADDRESS_GETALL);

export const GetAllAddressForUser = (id) => request.get(api.API_URL_USERADDRESS_GETALLADDRESSFORUSER + '/' + id);

// export const GetAllForUserById = async (data, token) => {
//     let response = await fetch(api.API_URL_USERADDRESS_GETALLFORUSERBYID, {
//         method: "GET",
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ ...data })
//     })

//     if (response.ok) {
//         return response;
//     } else {
//         throw response;
//     }
// }
// // export const create = async (data, token) => {
//     console.log(data)
//     let response = await fetch(api.API_URL_USERADDRESS_CREATE, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ ...data })
//     });

//     if (response.ok) {
//         return response;
//     } else {
//         throw response;
//     }
// }

export const deleteById = async (id, token) => {
    let response = await fetch(api.API_URL_USERADDRESS_DELETE + '/' + id, {
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
