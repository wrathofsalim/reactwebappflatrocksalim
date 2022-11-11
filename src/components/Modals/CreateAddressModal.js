import React from "react";
import CreateAddress from '../../components/Addresses/CreateAddresses';
import "./Modal.css"

const CreateAddressModal = ({ onClose }) => {

    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <CreateAddress />
                <p onClick={onClose}>X</p>
            </div>
        </div>
    )
}

export default CreateAddressModal;