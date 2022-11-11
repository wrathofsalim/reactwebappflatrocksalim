import * as addressServices from '../../services/AddressService';
import * as userAddressServices from '../../services/UserAddressService';
import * as address from "../Addresses/Addresses"
import Cities from "../../constants/bg.json"
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import { useNotification } from "../../contexts/NotificationContext";



export default function CreateAddress(prop) {
    const { user } = useAuthContext();
    const dispatch = useNotification();
    const handleNewNotification = (type, msg, title) => {
        dispatch({
            type: type,
            message: msg,
            title: title
        })
    }
    let counter = 0;

    const [name, SetName] = useState("");
    const [street, SetStreet] = useState("");
    const [city, SetCity] = useState("");


    const handleStreet = (e) => {

    }

    const onAddressCreate = (e) => {
        e.preventDefault();
        if (street.trim() === "") {
            return handleNewNotification("error", "You have to write your address.", "Error");
        }
        if (city.trim() === "") {
            return handleNewNotification("error", "You have to choose a city.", "Error");
        }

        let userId = user.userModel.id;
        addressServices.create({ name, userId }, user.accessToken);
        window.location.reload(false);
        SetName("")
        SetStreet("")
        SetCity("")
        handleNewNotification("success", "Address successully added", 'Added')
    }

    const capitalize = (e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
    }

    const handleChangeSetCity = (e) => {
        SetCity(e.target.value);
        handleName(e.target.value, street);
    };

    const handleChangeSetStreet = (e) => {
        const regex = new RegExp("^[a-zA-Z0-9 ]{0,32}$")
        let _street = e.target.value.toLowerCase()
        _street = capitalize(_street);

        let isMatch = _street.match(regex);
        if (isMatch) {
            SetStreet(_street);
            handleName(city, e.target.value);
        }
    }

    const handleName = (city, street) => {
        SetName(city + ", " + street);
    }


    return (
        <>
            <figure>
                <form onSubmit={onAddressCreate} method="put" autoComplete='off'>
                    <div className="modal_box">
                        <h2>Create Address</h2>
                        <h3>Select a city:</h3>
                        <select value={city} onChange={handleChangeSetCity}>
                            <option>Select a City:</option>
                            {
                                Cities && Cities.map(city =>
                                    <option key={counter++} value={city.city}>{city.city}</option>
                                )
                            }
                        </select>
                        <br />
                        <br />
                        <input value={street} onChange={handleChangeSetStreet}
                            type="text" name="street" id="street" placeholder='Street name' />
                    </div>
                    <div className="buttons">
                        <button type='submit'>
                            <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
                        </button>
                    </div>
                    <br />
                </form>
            </figure>
        </>
    )
}
