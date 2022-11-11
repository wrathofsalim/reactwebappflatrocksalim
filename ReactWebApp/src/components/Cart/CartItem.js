import React from 'react';
import { useCartContext } from '../../contexts/CartContext';

export default function CartItem(prop) {
    const { addItemToCart, removeItemFromCart } = useCartContext();

    const addToCartHandler = () => {
        addItemToCart(prop.id, prop.name, prop.price);
    }
    const removeFromCartHandler = () => {
        removeItemFromCart(prop.id, prop.name, prop.price);
    }



    return (
        <div className="cart_box">
            <h1>
                {prop.name}
            </h1>
            <div>
                <div className='priceTag'>
                    {prop.price}
                    <img className='coin' src="../images/coin.png" alt="" />
                </div>
            </div>

            <div className='quantityTag'>
                {prop.quantity}
            </div>
            <div className='buttons'>
                <button onClick={addToCartHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1721/1721588.png" />
                </button>

                <button onClick={removeFromCartHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3285/3285665.png" alt="" />
                </button>
            </div>
        </div>
    )
}