import React, { useEffect, useState } from "react";
import CategoriesItems from './CategoriesItems'
import * as categoryServices from '../../services/CategoryService';
import { useAuthContext } from "../../contexts/AuthContext";
import Forbidden from "../Forbidden/Forbidden";
import './Categories.css'

export const GetAllItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        categoryServices.getAll()
            .then(res => {
                setItems(res)
            })
    }, []);

    return items;
}

export default function Categories() {
    const { user } = useAuthContext();

    let developerPanel = <>
        {
            (user.userRoles == "Admin" || user.userRoles == "Employee")
            &&

            <div className="container-fluid category">
                <div className="titlepage">
                    <h2>Developer's Panel</h2>
                </div>
                <div className="row d-flex justify-content-center">
                    <CategoriesItems edit="true" />
                </div>
                <div className="titlepage">
                    <h2>Main Categories</h2>
                </div>
                <div className="row d-flex justify-content-center">
                    {GetAllItems().map(item =>
                        item.parentId == null
                        &&
                        <CategoriesItems
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            edit="false"
                        />)
                    }
                </div>
                <div className="titlepage">
                    <h2>Sub Categories</h2>
                </div>
                <div className="row d-flex justify-content-center">
                    {GetAllItems().map(item =>
                        item.parentId != null
                        &&
                        <CategoriesItems
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            parentId={item.parentId}
                            edit="false"
                        />)
                    }
                </div>
            </div>
        }</>
    return (
        <>
            {
                (
                    (user.userRoles == "Admin" || user.userRoles == "Employee")
                    &&
                    developerPanel
                )
                ||
                <Forbidden />
            }

        </>
    )
}