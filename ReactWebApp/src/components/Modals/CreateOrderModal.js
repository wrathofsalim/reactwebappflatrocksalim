import React from "react";
import CreateOrders from '../../components/Orders/CreateOrders';
import "./Modal.css"

const CreateOrdersModal = ({userId, totalAmount, quantity, onClose}) => {

    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <CreateOrders
                    userId={userId}
                    totalAmount={totalAmount}
                    quantity={quantity}
                />
                <p onClick={onClose}>X</p>
            </div>
        </div>
    )
}

export default CreateOrdersModal;