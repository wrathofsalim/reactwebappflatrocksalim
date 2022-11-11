import * as orderServices from '../../services/OrdersServices';
import * as userServices from '../../services/UserService';
import { useAuthContext } from '../../contexts/AuthContext';
import * as userAddressService from '../../services/UserAddressService';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCartContext } from '../../contexts/CartContext';

export const orderStatus = [
    { key: 'Pending', value: 0, text: 'Pending' },
    { key: 'Shipping', value: 1, text: 'Shipping' },
    { key: 'Delivered', value: 2, text: 'Delivered' },
    { key: 'Complete', value: 3, text: 'Complete' },
    { key: 'OnHold', value: 4, text: 'OnHold' },
    { key: 'Cancelled', value: 5, text: 'Cancelled' }
]

export default function CreateOrders(prop) {
    const { user } = useAuthContext();
    const { clear } = useCartContext();

    const { getCartQuantity } = useCartContext();

    const [openModal, setOpenModal] = useState(false);
    const [userId, SetUserId] = useState(user.userModel.id);
    const [totalPrice, SetTotalPrice] = useState("");
    const [status, SetStatus] = useState(0);
    const [quantity, SetQuantity] = useState(getCartQuantity());
    const [allUsers, SetAllUsers] = useState("");
    const [allUserAddresses, setAllUserAddresses] = useState("");
    const [deliveryAddressId, SetDeliveryAddress] = useState("")
    const [isAddress, SetIsAddress] = useState(true)
    const [isActive, SetIsActive] = useState(true)

    const [options, SetOptions] = useState([]);


    useEffect(() => {
        userServices.getAll().then(res => SetAllUsers(...allUsers, res));
        userAddressService.GetAllAddressForUser(user.userModel.id).then(res => setAllUserAddresses(...allUserAddresses, res))
        SetTotalPrice(prop.totalAmount)
        console.log(quantity)
    }, [])

    const handleChangeAddress = (e) => {
        SetDeliveryAddress(e.target.value);
    }

    const onMakeOrder = (e) => {
        e.preventDefault();
        let response
        let answer = (window.confirm("Do you want to proceed with the purchase?"));
        if (answer) {
            response = orderServices.create({
                quantity, totalPrice, status, deliveryAddressId, userId, isActive
            }, user.accessToken);
            clear();
        } else {
            console.log("Cancelled.")
        }
    }


    const handleChangeSetUserName = (e) => {
        SetUserId(e.target.value);
    };

    const handleIsAddress = (e) => {

        if (e.target.checked) {
            SetIsAddress(false);
        }
        else {
            SetIsAddress(true);
        }
    }
    return (
        <>
            <figure className='justify-content-center'>
                <div className="modal_box">
                    {
                        (
                            user.userRoles == 'Admin'
                            &&
                            <select value={userId} onChange={handleChangeSetUserName}>
                                {
                                    allUsers && allUsers.map(user =>
                                        <option key={user.id} value={user.id}>{user.userName}</option>
                                    )
                                }
                            </select>
                        )
                        ||
                        <input value={"Username: " + user.userModel.userName} readOnly />
                    }
                    {
                        (
                            isAddress
                            &&
                            <select onChange={handleChangeAddress}>
                                < option value="0">Select an address</option>
                                {
                                    allUserAddresses && allUserAddresses.map(x =>
                                        <option key={x.addressId} value={x.addressId}>{x.address.name}</option>
                                    )
                                }
                            </select>
                        )
                        ||
                        (
                            !isAddress
                            &&
                            <button className='link-btn' >
                                <Link className='link' to="/Addresses">Add new address</Link>
                            </button>
                        )
                    }

                    <div className=''>
                        <div className=''>
                            <h3 >New address? </h3>
                        </div>
                        <div className=''>
                            <input type="checkbox" onClick={handleIsAddress} />
                        </div>
                    </div>
                    <input value={"Quantity: " + quantity} type="numer" name="quantity" id="quantity" readOnly />
                    <h2>TotalAmount</h2>
                    <input value={totalPrice} type="number" name="price" id="price" readOnly />
                </div>
                <br />
                <div className='buttons'>
                    <button onClick={onMakeOrder}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2629/2629030.png" />
                    </button>
                </div>
            </figure>
        </>
    )
}
