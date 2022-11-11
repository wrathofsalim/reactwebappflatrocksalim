import React from "react";
import UpdateOrders from '../../components/Orders/UpdateOrders';
import "./Modal.css"

const UpdateOrderModal = ({ id, onClose }) => {
    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <UpdateOrders id={id} />
                <p onClick={onClose} className='fa fa-times'></p>
            </div>
        </div>
    )
}

export default UpdateOrderModal;