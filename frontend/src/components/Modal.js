import React from 'react';
import { FiX } from 'react-icons/fi'

const Modal = ({ onClose = () => { }, id = 'modal', children }) => {

    const handleOutsideClick = (e) => {
        if (e.target.id === id)
            onClose();
    }

    return (
        <div id="modal" className="modal" onClick={handleOutsideClick}>
            <div className="containerModal">
                <button className="close" onClick={onClose}><FiX size={32} /></button>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default Modal;