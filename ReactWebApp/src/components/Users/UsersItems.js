import React, { useState, useEffect } from 'react';
import UpdateUserModal from "../Modals/UpdateUserModal";
import * as userServices from "../../services/UserService"
import { useAuthContext } from '../../contexts/AuthContext';

export default function UsersItems(prop) {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAuthContext();
    const [colorInner, setColorInner] = useState([]);
    const [colorOuter, setColorOuter] = useState([]);
    const [status, SetStatus] = useState(prop.isActive)

    const ColorsHandler = (status) => {
        if (status) {
            setColorInner("#cbf5dd");
            setColorOuter("lightgreen")
        }

        if (!status) {
            setColorInner("#ffe8e7");
            setColorOuter("lightcoral");
        }
    }

    useEffect(() => {
        ColorsHandler(status)
    }, []);

    const handleEnable = (e) => {
        e.preventDefault();
        userServices.activateById(prop.id, user.accessToken)
        SetStatus(true)
        ColorsHandler(true)
    }
    const handleDisable = (e) => {
        e.preventDefault();
        userServices.deleteById(prop.id, user.accessToken);
        SetStatus(false)
        ColorsHandler(false)
    }

    return (
        <>
            < figure >
                <div style={{ backgroundColor: colorOuter }} onClick={() => setOpenModal(true)} className="users_box">
                    <div onClick={(e) => { e.stopPropagation(); }}>
                        {openModal && <UpdateUserModal id={prop.id} open={openModal} onClose={() => setOpenModal(false)} />}
                    </div>
                    <h2 style={{ backgroundColor: colorInner }} className="title">{prop.userName}</h2>
                    <h2 style={{ backgroundColor: colorInner }} className='others'>{prop.email}</h2>
                    <h2 style={{ backgroundColor: colorInner }} className='others' placeholder='First Name'>{prop.firstName}</h2>
                    <h2 style={{ backgroundColor: colorInner }} className='others' placeholder='Last Name'>{prop.lastName}</h2>
                </div>
                {
                    !status
                    &&
                    <div className='buttons'>
                        <button onClick={handleEnable}>
                            <img className='enable' src="https://cdn-icons-png.flaticon.com/512/1231/1231902.png" alt="" />
                        </button>
                    </div>
                    ||
                    status
                    &&
                    < div className='buttons'>
                        <button onClick={handleDisable}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2576/2576686.png" alt="" />
                        </button>
                    </div>
                }
            </figure >
        </>
    )
}