import React, { useState } from 'react';
import { useEffect } from 'react';
import * as categoryServices from '../../services/CategoryService';
import CreateCategoryModal from "../Modals/CreateCategoryModal";
import UpdateCategoryModal from "../Modals/UpdateCategoryModal";


export default function CategoriesItems(prop) {
    const colorInMiss = "#e8f4f8";
    const colorOutMiss = "lightskyblue";
    const colorInArmor = "#cbf5dd";
    const colorOutArmor = "lightgreen";
    const colorInWeapon = "#ffe8e7"
    const colorOutWeapon = "lightcoral"
    let edit = prop.edit;

    let cardPanel;

    const [parentName, setParentName] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [colorIn, setColorIn] = useState([]);
    const [colorOut, setColorOut] = useState([]);

    useEffect(() => {
        if (prop.parentId != null) {
            categoryServices.getById(prop.parentId).then(res => setParentName(res[1]))
        }

        if (prop.name == 'Armor' || parentName == "Armor") {
            setColorIn(colorInArmor);
            setColorOut(colorOutArmor);
        }

        if (prop.name == 'Miscellaneous' || parentName == "Miscellaneous") {
            setColorIn(colorInMiss);
            setColorOut(colorOutMiss);
        }

        if (prop.name == 'Weapons' || parentName == "Weapons") {
            setColorIn(colorInWeapon);
            setColorOut(colorOutWeapon);
        }
    })




    if (edit == "true") {
        cardPanel =
            <div className="col-sm-4">
                <button className="create-btn btn btn-primary col-sm-10" onClick={() => { setOpenModal(true); }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1721/1721588.png" alt="" />
                </button>
                {openModal && <CreateCategoryModal onClose={() => setOpenModal(false)} />}
            </div>
    }
    else if (edit == "false") {
        cardPanel =
            <figure>

                <div style={{ backgroundColor: colorOut }} onClick={() => setOpenModal(true)} className="category_box">
                    <div onClick={(e) => { e.stopPropagation(); }}>
                        {openModal && <UpdateCategoryModal id={prop.id} open={openModal} onClose={() => setOpenModal(false)} />}
                    </div>
                    <h2 style={{ backgroundColor: colorIn }} className="title">{prop.name}</h2>
                    {
                        prop.parentId
                        &&
                        <h2 style={{ backgroundColor: colorIn }} className="title">{parentName}</h2>
                    }
                    {
                        <p style={{ backgroundColor: colorIn }} className='card_description'>{prop.description}</p>
                    }
                </div>

            </figure>
    }
    return (
        <>
            {cardPanel}
        </>
    )
}