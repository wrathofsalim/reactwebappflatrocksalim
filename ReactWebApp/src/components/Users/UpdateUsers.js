import * as userService from '../../services/UserService';
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';

export default function UpdateUser(prop) {
    const { user } = useAuthContext();
    const [id, SetId] = useState("");
    const [username, SetUsername] = useState("");
    const [email, SetEmail] = useState("");
    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [status, SetStatus] = useState("");

    useEffect(() => {
        userService.getById(prop.id)
            .then(res => {
                console.log(res)
                SetId(res[1]); SetUsername(res[2]); SetEmail(res[4]); SetFirstName(res[5]);
                SetLastName(res[6]); SetStatus(res[7]);
            });
    }, []);

    let colorIn; let colorOut;

    if (status) {
        colorIn = "#cbf5dd";
        colorOut = "lightgreen";
    }

    if (!status) {
        colorIn = "#ffe8e7";
        colorOut = "lightcoral"
    }

    const onUserUpdate = (e) => {
        e.preventDefault();
        let res = userService.edit({ id, username, firstName, lastName, email, status }, user.accessToken);
        window.location.reload(false);
    }

    return (
        <>
            <figure>
                <form onSubmit={onUserUpdate} method="PUT">
                    <div className='modal_box' style={{ backgroundColor: colorOut }} >

                        <input value={username || ""} onChange={e => SetUsername(e.target.value)} type="text" name="username" id="username" style={{ backgroundColor: colorIn }} placeholder="Username" />

                        <input value={email || ""} onChange={e => SetEmail(e.target.value)} type="text" name="email" id="email" style={{ backgroundColor: colorIn }} placeholder="E-mail" />

                        <input value={firstName || ""} onChange={e => SetFirstName(e.target.value)} type="text" name="firstName" id="firstName" style={{ backgroundColor: colorIn }} placeholder="First Name" />

                        <input value={lastName || ""} onChange={e => SetLastName(e.target.value)} type="text" name="lastName" id="lastName" style={{ backgroundColor: colorIn }} placeholder="Last Name" />
                    </div>
                    <div className="buttons">
                        <button type='submit'>
                            <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
                        </button>
                    </div>
                </form>
            </figure>
        </>
    )
}