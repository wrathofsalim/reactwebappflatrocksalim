import React, { useEffect, useState } from "react";
import AddressesItems from './AddressesItems'
import * as addressService from '../../services/AddressService';
import * as userAddressService from '../../services/UserAddressService';
import { useAuthContext } from "../../contexts/AuthContext";
import UserAddressItems from "./UserAddressItems";
import Forbidden from "../Forbidden/Forbidden";
import "./Addresses.css"

export const GetAddressItems = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        addressService.getAll()
            .then(res => {
                console.log(res)
                setItems(res);
            });
    }, []);
    return (items)
}

export const GetUserAddressItems = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        userAddressService.getAll()
            .then(res => {
                setItems(res);
            });
    }, []);
    return (items)
}

export default function Addresses() {
    const { user } = useAuthContext();
    let counter = 0;

    let panel =
        <>
            <div className="container-fluid users">
                <div className="titlepage">
                    <h2>Addresses</h2>
                </div>
                <div className="row d-flex justify-content-center">
                    <AddressesItems/>
                </div>
                <div className="row d-flex justify-content-center">
                    {
                        user.userRoles != "Admin"
                        &&
                        GetUserAddressItems().map(item =>
                            item.userId == user.userModel.id
                            &&
                            < UserAddressItems key={counter++}
                                userId={item.userId}
                                addressId={item.addressId}
                            />)
                    }
                    {
                        user.userRoles == "Admin"
                        &&
                        GetUserAddressItems().map(item =>
                            < UserAddressItems key={counter++}
                                userId={item.userId}
                                addressId={item.addressId}
                            />)
                    }
                </div>
            </div>
        </>

    return (
        <>
            {
                (
                    (user.userRoles == "Admin" || user.userRoles == "Employee" || user.userRoles == "Customer")
                    &&
                    panel
                ) || <Forbidden />
            }
        </>
    )
}