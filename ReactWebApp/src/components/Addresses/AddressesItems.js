import React, { useState } from 'react';
import { useEffect } from 'react';
import UpdateAddressModal from "../Modals/UpdateAddressModal";
import CreateAddressModal from '../Modals/CreateAddressModal';
import * as addressServices from '../../services/AddressService'

export default function AddressessItems(prop) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="col-sm-4">
                <button className="create-btn btn btn-primary col-sm-10" onClick={() => { setOpenModal(true); }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1721/1721588.png" alt="" />
                </button>
                {openModal && <CreateAddressModal onClose={() => setOpenModal(false)} />}
            </div>
            {/* <div style={{ backgroundColor: "lightgreen" }}>
                <h3 style={{ backgroundColor: '#cbf5dd' }}>{prop.name}</h3>
              
            </div> */}

        </>
    )
}