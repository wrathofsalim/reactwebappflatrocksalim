import * as productService from '../../services/ProductServices';
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import * as category from '../Categories/Categories'

export default function CreateProduct(prop) {
    const { user } = useAuthContext();

    const [name, SetName] = useState("");
    const [imageUrl, SetImageUrl] = useState("https://cdn-icons-png.flaticon.com/512/1375/1375106.png");
    const [price, SetPrice] = useState('');
    const [categoryId, SetCategoryId] = useState("");
    const [description, SetDescription] = useState("");

    const handleChange = (e) => {
        SetCategoryId(e.target.value);
    };

    const onProductCreate = (e) => {
        e.preventDefault();
        let response
        let answer = window.confirm("Save data?");
        if (answer) {
            response = productService.create({
                name, price, categoryId, imageUrl, description
            }, user.accessToken);
            window.location.reload(false);
        }
        else {
            console.log("Cancelled")
        }
    }

    return (
        <figure>
            <form onSubmit={onProductCreate} method="post">
                <div className="modal_box">
                    <input value={name || ""} onChange={e => SetName(e.target.value)} type="text" name="name" id="name" placeholder='name' />

                    <input value={imageUrl || ""} onChange={e => SetImageUrl(e.target.value)} type="text" name="imageUrl" id="imageUrl" placeholder='ImageURL' />

                    <img style={{ height: 240, width: 240, padding: 20 }}  src={imageUrl} placeholder='Image' />

                    <input value={description || ""} onChange={e => SetDescription(e.target.value)} type="text" name='description' id='description' placeholder='Description' />

                    <select value={categoryId} onChange={handleChange} >
                        <option>Caregory</option>
                        {
                            category.GetAllItems().map(item =>
                                <option type="button" key={item.id} value={item.id}>
                                    {item.name}
                                </option>)
                        }
                    </select>

                    <input value={price || ""} onChange={e => SetPrice(e.target.value)} className='priceTag' type="number" name="price" id="price" placeholder='Price' />
                </div>
                <div className="buttons">
                    <button type='submit'>
                        <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
                    </button>
                </div>
            </form>
        </figure>
    )
}
