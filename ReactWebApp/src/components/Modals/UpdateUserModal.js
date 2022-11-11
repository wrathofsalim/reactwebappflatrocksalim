import React from "react";
import UpdateUsers from '../../components/Users/UpdateUsers';
import "./Modal.css"

const UpdateUserModal = ({ id, onClose }) => {
    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">
                <UpdateUsers id={id} />
                <p onClick={onClose} className='fa fa-times'></p>
            </div>
        </div>
    )
}

export default UpdateUserModal;