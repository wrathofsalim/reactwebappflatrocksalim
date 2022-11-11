import React, { useState, useEffect } from 'react';
import CreateProductModal from "../Modals/CreateProductModal";
import UpdateProductModal from "../Modals/UpdateProductModal";
import { useCartContext } from '../../contexts/CartContext';
import { useAuthContext } from "../../contexts/AuthContext";

const colorIn = (price) => {
    if (price < 5) {
        return "ghostwhite";
    } else if (price >= 5 && price < 50) {
        return "#cbf5dd"
    } else if (price >= 50 && price < 100) {
        return "#ffe8e7"
    } else if (price >= 100 && price < 200) {
        return "#e8f4f8"
    } else if (price >= 200) {
        return "#fffdb8"
    }
}

const colorOut = (price) => {
    if (price < 5) {
        return "silver";
    } else if (price >= 5 && price < 50) {
        return "lightgreen"
    } else if (price >= 50 && price < 100) {
        return "lightcoral"
    } else if (price >= 100 && price < 200) {
        return "lightskyblue"
    } else if (price >= 200) {
        return "#f4cd2a"
    }
}

export default function ProductsItems(prop) {
    const { user } = useAuthContext();

    const { addItemToCart, getItemQuantity, removeItemFromCart } = useCartContext();

    const [openModal, setOpenModal] = useState(false);

    const addToCartHandler = () => addItemToCart(prop.id, prop.name, prop.price);

    const removeFromCartHandler = () => removeItemFromCart(prop.id, prop.name, prop.price);

    const getQuantity = () => getItemQuantity(prop.id)

    return (
        <>
            {
                prop.edit == 'true'
                &&
                <div className="col-sm-4">
                    <button className="create-btn btn btn-primary col-sm-10" onClick={() => { setOpenModal(true); }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1721/1721588.png" alt="" />
                    </button>
                    {openModal && <CreateProductModal onClose={() => setOpenModal(false)} />}
                </div>
                ||
                prop.edit == 'false'
                &&
                <figure>
                    <div onClick={() => setOpenModal(true)} style={{ backgroundColor: colorOut(prop.price) }} className="products_box">
                        <div onClick={(e) => { e.stopPropagation(); }}>
                            {openModal && <UpdateProductModal id={prop.id} open={openModal} onClose={() => setOpenModal(false)} />}

                        </div>
                        <h2 style={{ backgroundColor: colorIn(prop.price) }} className="title">{prop.name}</h2>

                        <img style={{ backgroundColor: colorIn(prop.price) }} className="img" src={prop.imageUrl} alt='' />

                        <div style={{ backgroundColor: colorIn(prop.price) }} className="priceTag" >
                            {Number(prop.price).toFixed(2)} <img className="coin" src="images/Coin.png" />
                        </div>
                    </div>
                    {(user.userRoles == "Admin" || user.userRoles == 'Employee' || user.userRoles == "Customer")
                        &&
                        <div className='col buttons d-flex justify-content-center'>
                            <button onClick={addToCartHandler}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1721/1721588.png" />
                            </button>
                            <h2 className='quantity'> {getQuantity()} </h2>

                            <button onClick={removeFromCartHandler}>
                                <img src="https://cdn-icons-png.flaticon.com/512/3285/3285665.png" alt="" />
                            </button>
                        </div>}
                </figure>
            }
        </>
    )
}

