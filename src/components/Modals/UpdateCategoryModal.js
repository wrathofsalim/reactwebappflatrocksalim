import React from "react";
import UpdateProducts from '../../components/Categories/UpdateCategories';
import "./Modal.css"

const UpdateProductModal = ({ id, onClose }) => {
    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <UpdateProducts id={id} />
                <p onClick={onClose} className='fa fa-times'></p>
            </div>
        </div>
    )
}

export default UpdateProductModal;