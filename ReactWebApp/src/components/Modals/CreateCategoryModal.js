import React from "react";
import CreateCategory from '../../components/Categories/CreateCategories';
import "./Modal.css"

const CreateCategoryModal = ({ onClose }) => {

    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <CreateCategory />
                <button className="closeBtn" onClick={onClose}>X</button>
            </div>
        </div>
    )
}

export default CreateCategoryModal;