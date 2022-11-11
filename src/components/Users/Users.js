import { useEffect, useState } from "react";
import React from 'react';
import UsersItems from './UsersItems';
import * as userServices from '../../services/UserService';
import { useAuthContext } from "../../contexts/AuthContext";
import Forbidden from "../Forbidden/Forbidden";
import './Users.css'



export default function Users() {
    const { user } = useAuthContext();
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        userServices.getAll()
            .then(res => {
                setItems(res);
            });
    }, [])

    return (
        (
            user.userRoles == "Admin"
            &&
            <>
                <div className="container-fluid users">
                    <div className="titlepage">
                        <h2>Users</h2>
                    </div>
                    <div className="row d-flex justify-content-center">
                        {
                            items.map(item =>
                                <UsersItems
                                    key={item.id}
                                    id={item.id}
                                    userName={item.userName}
                                    email={item.email}
                                    firstName={item.firstName}
                                    lastName={item.lastName}
                                    isActive={item.isActive}
                                />
                            )
                        }
                    </div>
                </div>
            </>
        )
        ||
        <Forbidden />
    )
}