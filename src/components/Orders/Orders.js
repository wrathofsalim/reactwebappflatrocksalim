import React, { useEffect, useState } from "react";
import OrderItems from './OrderItems';
import * as orderServices from '../../services/OrdersServices';
import { useAuthContext } from "../../contexts/AuthContext";
import Forbidden from "../Forbidden/Forbidden"
import "./Orders.css"

export const GetAllOrders = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        orderServices.getAll()
            .then(res => {
                setItems(res);
            });
    }, []);
    return (items)
}

export default function Orders() {
    const { user } = useAuthContext();

    return (
        (
            user.userRoles == "Customer"
        )
        &&
        <>
            <div className="container-fluid orders">
                <div className="titlepage">
                    <h2>
                        Orders
                    </h2>
                </div>
                <div>
                    <div className="row d-flex justify-content-center">
                        {
                            GetAllOrders().map(item =>
                                user.userModel.id == item.userId
                                &&
                                <OrderItems
                                    key={item.id}
                                    id={item.id}
                                    quantity={item.quantity}
                                    totalPrice={item.totalPrice}
                                    status={item.status}
                                    deliveryAddressId={item.deliveryAddressId}
                                    userId={item.userId}
                                >
                                </OrderItems>
                            )}
                    </div>
                </div>
            </div>
        </>
        ||
        (
            user.userRoles == "Admin" ||
            user.userRoles == "Employee"
        )
        &&
        <>
            <div className="container-fluid orders">
                <div className="titlepage">
                    <h2>
                        Orders
                    </h2>
                </div>
                <div>
                    <div className="row d-flex justify-content-center">
                        {

                            GetAllOrders().map(item =>
                                <OrderItems

                                    key={item.id}
                                    id={item.id}
                                    quantity={item.quantity}
                                    totalPrice={item.totalPrice}
                                    status={item.status}
                                    deliveryAddressId={item.deliveryAddressId}
                                    userId={item.userId}
                                >
                                </OrderItems>
                            )}
                    </div>
                </div>
            </div>
        </>
        || <Forbidden />
    )
}