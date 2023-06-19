import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from "prop-types";
import "./../style/Form/input.scss";

export default function Input({ label, name, type, placeholder, value, handleChange }) {
    return (
        <Form.Group className='mb-3'>
            {label ?? <Form.Label className="input-label mb-0">{label}</Form.Label>}
            <Form.Control onChange={handleChange} className="form-input shadow-none" type={type} placeholder={placeholder} name={name} />
        </Form.Group>
    );
}
Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string
};
Input.defaultProps = {
    placeholder: PropTypes.string.isRequired
};