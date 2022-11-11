import * as categoryServices from '../../services/CategoryService';
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import * as category from '../Categories/Categories'

export default function CreateCategory(prop) {
    const { user } = useAuthContext();

    const [name, SetName] = useState("");
    const [description, SetDescription] = useState("");
    const [parentId, SetParentId] = useState("0");


    const handleChange = (e) => {
        SetParentId(e.target.value);
    };


    const onCategoryCreate = (e) => {
        e.preventDefault();
        let response;
        if (parentId == "0") {
            response = categoryServices.create({
                name, description
            }, user.accessToken);
        } else {

            response = categoryServices.create({
                name, description, parentId
            }, user.accessToken);
        }
        window.location.reload(false);
    }

    return (
        <>
            <figure>
                <form onSubmit={onCategoryCreate} method="post">
                    <div className="modal_box ">
                        <input value={name || ""} onChange={e => SetName(e.target.value)} type="text" name="name" id="name" placeholder='name' />

                        <input value={description || ""} onChange={e => SetDescription(e.target.value)} type="text" name='description' id='description' placeholder='Description' />

                        <select value={parentId} onChange={handleChange} >
                            <option value='null'> Main Category </option>
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
                    </div>
                    <br />
                </form>
            </figure>
        </>
    )
}
