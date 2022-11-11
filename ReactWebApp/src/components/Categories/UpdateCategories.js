import * as categoryServices from '../../services/CategoryService';
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import * as category from '../Categories/Categories'

export default function UpdateProduct(prop) {
    const { user } = useAuthContext();
    const [id, SetId] = useState("");
    const [name, SetName] = useState("");
    const [parentId, SetParentId] = useState('');
    const [description, SetDescription] = useState('');

    const handleChange = (e) => {
        SetParentId(e.target.value);
    };


    useEffect(() => {
        categoryServices.getById(prop.id)
            .then(categoryResult => {
                SetId(categoryResult[0])
                SetName(categoryResult[1]);
                SetDescription(categoryResult[2]);
                if (categoryResult[3] != null) {
                    SetParentId(categoryResult[3])
                } else {
                    SetParentId('');
                }
            });
    }, []);

    const onCategoryUpdate = (e) => {
        e.preventDefault();
        if (parentId == "0") {
            categoryServices.edit({
                id, name, description
            }, user.accessToken);
        }
        else {
            categoryServices.edit({
                id, name, parentId, description
            }, user.accessToken);
        }
        window.location.reload(false);

    }

    const onCategoryDelete = (e) => {
        e.preventDefault();
        categoryServices.deleteById(id, user.accessToken)
            .then(result => {
                console.log(result)
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (

        <>
            {user.userRoles[0] == 'Admin' ?
                <figure>
                    <form onSubmit={onCategoryUpdate} method="put">
                        <div className="modal_box">
                            <input value={name || ""} onChange={e => SetName(e.target.value)} type="text" name="name" id="name" />

                            <input value={description || ""} onChange={e => SetDescription(e.target.value)} type="text" name='description' id='description' />

                            <select value={parentId} onChange={handleChange}>
                                <option value='0'>Main Category</option>
                                {
                                    category.GetAllItems().map(item =>
                                        <option type="button" key={item.id} value={item.id}>
                                            {item.name}
                                        </option>)
                                }
                            </select>
                        </div>
                        <div className="buttons">
                            <button type='submit'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
                            </button>
                            <button onClick={onCategoryDelete}>
                                <img src="https://cdn-icons-png.flaticon.com/512/2602/2602768.png" alt="" />
                            </button>
                        </div>
                        <br />
                    </form>
                </figure>
                : "You are not allowed"
            }
        </>
    )
}
