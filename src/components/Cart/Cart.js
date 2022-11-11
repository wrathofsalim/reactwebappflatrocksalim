import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';
import { useAuthContext } from '../../contexts/AuthContext';
import CreateOrdersModal from '../Modals/CreateOrderModal';
import Forbidden from '../Forbidden/Forbidden';
import "./Cart.css"

export default function Cart(prop) {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAuthContext();

    const [totalAmount, SetTotalAmout] = useState(0.00)
    const [itemsCount, SetItemsCount] = useState(0)
    const { getAllItems } = useCartContext();
    let render;
    useEffect(() => {
        SetItemsCount(0)
        setOpenModal(false);
        let counter = 0;
        getAllItems().map(item => {
            counter += (item.price * item.quantity);
            SetItemsCount(itemsCount + 1)
        })
        SetTotalAmout(counter)
    }, [getAllItems])
    
    render =
        (
            itemsCount <= 0
            &&
            <h1>
                Cart Is Empty
            </h1>
        ) || (

            itemsCount > 0
            &&
            getAllItems().map(item => (
                <CartItem
                    key={item.id}
                    {...item}
                />
            ))
        )


    return (
        (user.userRoles == "Admin" || user.userRoles == "Employee" || user.userRoles == "Customer")
        &&
        <>
            <div className="container-fluid">
                <div className="titlepage">
                    <h2>Cart</h2>
                </div>
            </div>
            <div className="container-fluid">
                <div className='cart row d-flex justify-content-center'>
                    {render}
                </div>
            </div>
            {
                itemsCount > 0
                &&
                <div className="container-fluid">
                    <div className="titlepage">
                        <h2>Finalize</h2>
                    </div>
                    <div>
                        <h1>
                            Total Amount: {Number(totalAmount).toFixed(2)} <img className="coin" src="images/Coin.png" />
                        </h1>
                        <div className="offset-sm-4 col-sm-4 orders">
                            <button className="btn btn-primary " onClick={() => { setOpenModal(true); }}>
                                PAY
                            </button>
                            {openModal &&
                                <CreateOrdersModal
                                    onClose={() => setOpenModal(false)}
                                    username={user.userModel.id}
                                    quantity={itemsCount}
                                    totalAmount={Number(totalAmount).toFixed(2)}
                                />}
                        </div>
                    </div>
                </div>
            }
        </>
        ||
        <Forbidden />
    );
}