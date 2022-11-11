import * as productService from '../../services/ProductServices';
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import * as category from '../Categories/Categories'

export default function UpdateProduct(prop) {
    const { user } = useAuthContext();

    const [id, SetId] = useState("");
    const [name, SetName] = useState("");
    const [imageUrl, SetImageUrl] = useState("https://cdn-icons-png.flaticon.com/512/1375/1375106.png");
    const [price, SetPrice] = useState("");
    const [categoryId, SetCategoryId] = useState("");
    const [description, SetDescription] = useState("");

    const handleChange = (e) => {
        SetCategoryId(e.target.value);
    };


    useEffect(() => {
        productService.getById(prop.id)
            .then(productResult => {
                SetId(productResult[0])
                SetName(productResult[1]);
                SetImageUrl(productResult[5]);
                SetPrice(productResult[3]);
                SetCategoryId(productResult[4]);
                SetDescription(productResult[2]);
            });
    }, []);

    const onProductUpdate = (e) => {
        e.preventDefault();
        let answer = window.confirm("Edit product?");
        if (answer) {
            productService.edit({
                id, name, price, categoryId, imageUrl, description
            }, user.accessToken);

            window.location.reload(false);
        }
        else {
            console.log("Cancelled")
        }
    }


    const onProductDelete = (e) => {
        e.preventDefault();
        let answer = window.confirm("Delete product?");

        if (answer) {
            productService.deleteById(id)
                .then(window.location.reload(false))
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            console.log("Cancelled")
        }
    }

    return (
        <>
            <figure>
                <form onSubmit={onProductUpdate} method="PUT">
                    <div className="modal_box">
                        <input value={name || ""} onChange={e => SetName(e.target.value)} type="text" name="name" id="name" />

                        <input value={imageUrl || ""} onChange={e => SetImageUrl(e.target.value)} type="text" name="imageUrl" id="imageUrl" style={{ height: 50 }} />

                        <img style={{ height: 240, width: 240, padding: 20 }} src={imageUrl} alt='' />

                        <input value={description || ""} onChange={e => SetDescription(e.target.value)} type="text" name='description' id='description' />

                        <select value={categoryId} onChange={handleChange}>
                            {
                                category.GetAllItems().map(item =>
                                    <option type="button" key={item.id} value={item.id}>
                                        {item.name}
                                    </option>)
                            }
                        </select>
                        <input value={price || ""} onChange={e => SetPrice(e.target.value)} type="number" name="price" id="price" />
                    </div>
                    {(user.userRoles == "Admin" || user.userRoles == 'Employee')
                        &&
                        <div className="buttons">
                            <button type='submit'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
                            </button>
                            <button onClick={onProductDelete}>
                                <img src="https://cdn-icons-png.flaticon.com/512/2602/2602768.png" alt="" />
                            </button>
                        </div>}
                    <br />
                </form>
            </figure>
        </>
    )
}
