import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "../style/Form/input.scss";

export default function Input({ label, name, type, placeholder, value, handleChange, controlId, error, touched, required }) {
    return (
        <Form.Group className='mb-3' controlId={controlId}>
            {label && <Form.Label className="input-label mb-0 user-select-none">{label}{required && <span className='text-danger'>*</span>}</Form.Label>}
            <Form.Control required={required} onChange={handleChange} className="form-input shadow-none" isValid={touched} isInvalid={error} type={type} placeholder={placeholder} name={name} />
            {error && <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>}
        </Form.Group>
    );
}
Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    controlId: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string
};
Input.defaultProps = {
    placeholder: PropTypes.string.isRequired,
};
