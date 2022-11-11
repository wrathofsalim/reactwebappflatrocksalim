import React, { useState } from 'react';
import * as userServices from "../../services/UserService"
import * as addressServices from "../../services/AddressService"
import { useEffect } from 'react';

export default function UserAddressItems(prop) {
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState('')
    const [address, setAddress] = useState('')
    const [isActiveAddress, SetIsActiveAddress] = useState(false)
    useEffect(() => {
        userServices.getById(prop.userId).then(res => setUser(res))
        addressServices.getById(prop.addressId).then(res => {
            setAddress(res)
            SetIsActiveAddress(res[4])
        })
    }, [])

    const onDeleteAddress = (e) => {
        e.preventDefault();
        console.log(address)
        let answer = (window.confirm("Do you want to proceed with the purchase?"));
        if (answer) {
            addressServices.deleteById(address[1]).then(res => res)
            setAddress('')
            setUser('')
            SetIsActiveAddress(false)
        } else {
            console.log("Cancelled.")
        }
    }

    return (
        <>
            {
                isActiveAddress
                &&
                <div style={{ backgroundColor: "lightgreen" }} onClick={() => setOpenModal(true)} className="address_box">
                    <h3 style={{ backgroundColor: '#cbf5dd' }}>{user[2]}</h3>
                    <h3 style={{ backgroundColor: '#cbf5dd' }}>{address[2]}</h3>
                    <button className='deleteButton' onClick={onDeleteAddress}>
                        <img className='deleteButtonImg' src="https://cdn-icons-png.flaticon.com/512/2602/2602768.png" alt="" />
                    </button>
                </div>
            }
        </>
    )
}