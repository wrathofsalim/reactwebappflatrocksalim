import React from "react";
import UpdateAddress from '../../components/Addresses/UpdateAddresses';
import "./Modal.css"

const UpdateAddressModal = ({ id, onClose }) => {
    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <UpdateAddress id={id} />
                <p onClick={onClose} className='fa fa-times'></p>
            </div>
        </div>
    )
}

export default UpdateAddressModal;