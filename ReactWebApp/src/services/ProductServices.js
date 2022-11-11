import * as request from '../services/Requester';
import * as api from "../constants/apiConstants"
import * as categoriesService from "../services/CategoryService"

export const getAll = () => request.get(api.API_URL_PRODUCTS_GETALL);

export const getAllWithFilterForCategory = (categoryId) => {
    let products = [];
    let nonParentCategories = []
    categoriesService.getAll().then(res => {
        res.forEach(allCategories => {
            if (allCategories.id == categoryId && allCategories.parentId != null) {

            }
            else if (allCategories.id == categoryId && allCategories.parentId == null) {
                categoriesService.getAll().then(res_two => {
                    res_two.forEach(allCategoriesSecond => {
                        if (allCategoriesSecond.parentId == allCategories.id) {
                            getAll().then(resProducts => {
                                resProducts.forEach(lastResProduct => {
                                    // console.log(lastResProduct.categoryId)
                                    if (allCategoriesSecond.id == lastResProduct.categoryId) {
                                        
                                        products.concat([lastResProduct])
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    })
    return products
}

export const getById = (id) => request.get(api.API_URL_PRODUCTS_GETBYID + '/' + id);

export const create = async (product_data, token) => {
    let response = await fetch(api.API_URL_PRODUCTS_CREATE, {
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
    let response = await fetch(api.API_URL_PRODUCTS_EDIT, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...product_data })
    })
    console.log(response)
    if (response.ok) {
        return response;
    } else {
        throw response.message;
    }
}

export const deleteById = async (id, token) => {
    let response = await fetch(api.API_URL_PRODUCTS_DELETE + '/' + id, {
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

