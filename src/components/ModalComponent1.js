import React from "react";
import "./style/ModalComponent1.scss";

export default function ModalComponent1({ title, subtitle, borderRight }) {
    const modalClassName = borderRight ? 'ModalComponent1 borderRight' : 'ModalComponent1';
    return (
        <>
            <div className={modalClassName}>
                <h4 className='title'>{title}</h4>
                <p className='sub-title'>{subtitle}</p>
            </div>
        </>
    );
}