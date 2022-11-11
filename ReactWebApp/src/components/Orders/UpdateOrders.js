import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as orders from './Orders'
import * as ordersServices from '../../services/OrdersServices';
import * as userServices from '../../services/UserService';
import * as addressServices from '../../services/AddressService';
import * as userAddressServices from '../../services/UserAddressService';

export const orderStatus = [
    { key: '0', value: 0, text: 'Pending' },
    { key: '1', value: 1, text: 'Shipping' },
    { key: '2', value: 2, text: 'Delivered' },
    { key: '3', value: 3, text: 'Complete' },
    { key: '4', value: 4, text: 'OnHold' },
    { key: '5', value: 5, text: 'Cancelled' }
]

export default function UpdateOrders(prop) {
    const { user } = useAuthContext();
    const [id, SetId] = useState("");
    const [quantity, SetQuantity] = useState("");
    const [totalPrice, SetTotalPrice] = useState("");
    const [status, SetStatus] = useState("");
    const [deliveryAddressId, SetDeliveryAddressId] = useState("null");
    const [deliveryAddress, SetDeliveryAddress] = useState("");
    const [allDeliveryAddressesForCustomer, SetAllDeliveryAddressesForCustomer] = useState([])
    const [allDeliveryAddressesForSelect, SetAllDeliveryAddressesForSelect] = useState([])
    const [userId, SetUserId] = useState("null");
    const [userName, SetUserName] = useState('')
    const [isActive, SetIsActive] = useState("");
    let counter = 0;

    useEffect(() => {
        ordersServices.getById(prop.id)
            .then(res => {
                SetId(res[0])
                SetQuantity(res[1])
                SetTotalPrice(res[2])
                SetStatus(res[3])
                SetDeliveryAddressId(res[4])
                SetUserId(res[5])
                SetIsActive(res[6])
            });
        if (userId != 'null') {
            userServices.getById(userId)
                .then(res => {
                    SetUserName(res[2])
                })


            userAddressServices.GetAllAddressForUser(userId)
                .then(res => res.forEach(element => {
                    SetAllDeliveryAddressesForCustomer(allDeliveryAddresses => [...allDeliveryAddresses, element.addressId]);
                    // console.log(element)
                }))
        }
        addressServices.getAll()
            .then(res => {
                SetAllDeliveryAddressesForSelect(res);
            });

    }, [userId]);


    const OnOrderUpdate = (e) => {
        e.preventDefault();
        let response;
        let answer = (window.confirm("Do you want to save?"));
        if (answer) {
            response = ordersServices.edit({
                id,
                quantity,
                totalPrice,
                status,
                deliveryAddressId,
                userId,
                isActive
            }, user.accessToken).then(res => res);
            if (response.ok) {
                window.location.reload(false);
            }
            else{
                
            }
        } else {
            console.log("Cancelled")
        }
    }

    return (

        <>
            {
                user.userRoles == 'Admin' &&

                <figure>
                    <form onSubmit={OnOrderUpdate} method="put">
                        <div className="modal_box" style={{ width: 520 }}>
                            <label htmlFor="orderId"><h2>Order Id</h2></label>
                            <input value={id || ""} onChange={e => SetId(e.target.value)} type="text" name="orderId" id="orderId" />
                            <input value={userName} type="text" name="userId" id="userId" readOnly />
                            <select value={status} onChange={(e) => SetStatus(e.target.value)}>
                                {
                                    orderStatus.map(res =>
                                        <option key={res.value} value={res.value}>{res.text}</option>
                                    )
                                }
                            </select>
                            <select value={deliveryAddressId} onChange={(e) => SetDeliveryAddressId(e.target.value)}>
                                {allDeliveryAddressesForSelect
                                    .map(el =>
                                        < option key={counter++} value={el.id} > {el.name}</option>
                                    )}
                            </select>

                            <input value={"Quantity: " + quantity || ""} onChange={(e) => SetId(e.target.value)} type="text" name="quantity" id="quantity" />
                            <input value={"Total: " + totalPrice || ""} onChange={(e) => SetId(e.target.value)} type="text" name="totalPrice" id="totalPrice" />


                        </div>
                        <div className="buttons">
                            <button type='submit'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
                            </button>
                        </div>
                        <br />
                    </form>
                </figure>
                ||
                "You are not allowed"}
        </>
    )
}
