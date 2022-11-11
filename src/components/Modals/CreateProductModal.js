import React from "react";
import CreateProduct from '../../components/Products/CreateProducts';
import "./Modal.css"

const CreateProductModal = ({ id, onClose }) => {

    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <CreateProduct />
                <button className="closeBtn" onClick={onClose}>X</button>
            </div>
        </div>
    )
}

export default CreateProductModal;