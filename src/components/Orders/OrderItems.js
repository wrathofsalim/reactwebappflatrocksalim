import React, { useEffect, useState } from "react";
import * as userServices from "../../services/UserService";
import * as addressServices from "../../services/AddressService";
import { useAuthContext } from "../../contexts/AuthContext";
import UpdateOrderModal from "../Modals/UpdateOrderModal";


const orderStatus = [
    { key: 'Pending', value: 0, text: 'Pending' },
    { key: 'Shipping', value: 1, text: 'Shipping' },
    { key: 'Delivered', value: 2, text: 'Delivered' },
    { key: 'Complete', value: 3, text: 'Complete' },
    { key: 'OnHold', value: 4, text: 'OnHold' },
    { key: 'Cancelled', value: 5, text: 'Cancelled' }
]

const StatusHandler = (status) => {
    if (status == 0) return orderStatus[0].text
    else if (status == 1) return orderStatus[1].text
    else if (status == 2) return orderStatus[2].text
    else if (status == 3) return orderStatus[3].text
    else if (status == 4) return orderStatus[4].text
    else if (status == 5) return orderStatus[5].text
}

const ColorOut = (status) => {
    if (status == 0) return "silver";
    else if (status == 1) return "lightskyblue"
    else if (status == 2) return "#B87333"
    else if (status == 3) return "lightgreen"
    else if (status == 4) return "#f4cd2a"
    else if (status == 5) return "lightcoral"
}

const ColorIn = (status) => {
    if (status == 0) return "ghostwhite";
    else if (status == 1) return "#e8f4f8"
    else if (status == 2) return "#F6D7B0"
    else if (status == 3) return "#cbf5dd"
    else if (status == 4) return "#fffdb8"
    else if (status == 5) return "#ffe8e7"
}

export default function OrdersItems(prop) {
    const { user } = useAuthContext();

    const [openModal, setOpenModal] = useState(false);
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [addressId, setAddressId] = useState()
    const [addressName, setAddressName] = useState()

    useEffect(() => {
        userServices.getById(prop.userId)
            .then(res => {
                setUserId(Object.values(res)[1]);
                setUserName(Object.values(res[2]))
            });
    }, []);

    useEffect(() => {
        addressServices.getById(prop.deliveryAddressId)
            .then(res => {
                setAddressId(Object.values(res)[1]);
                setAddressName(Object.values(res)[2]);
            });
    }, []);

    return (
        <>
            {
                <div style={{ backgroundColor: ColorOut(prop.status) }} onClick={() => setOpenModal(true)} className="orders_box">
                    {(
                        user.userRoles == "Admin" ||
                        user.userRoles == "Employee"
                    )
                        &&
                        <div onClick={(e) => { e.stopPropagation(); }}>
                            {openModal && <UpdateOrderModal id={prop.id} open={openModal} onClose={() => setOpenModal(false)} />}
                        </div>}
                    <div style={{ backgroundColor: ColorIn(prop.status) }} className="title">
                        User: {userName}
                    </div>
                    UserId : {userId}
                    <div style={{ backgroundColor: ColorIn(prop.status) }} className="address">
                        Delivery Address: {addressName}
                    </div>
                    <div style={{ backgroundColor: ColorIn(prop.status) }} className="title">
                        Status: {StatusHandler(prop.status)}
                    </div>
                    <div style={{ backgroundColor: ColorIn(prop.status) }} className="title">
                        Quantity: {prop.quantity}
                    </div>
                    <div style={{ backgroundColor: ColorIn(prop.status) }} className="title" >
                        Total Amount: {Number(prop.totalPrice).toFixed(2)} <img className="coin" src="images/Coin.png" alt='' />
                    </div>
                </div>
            }
        </>
    )
}
