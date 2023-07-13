import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "../style/Form/checkbox.scss";

export default function Checkbox({ label, name, type, id, value, className, onChange }) {
  const classes = `custom-checkbox user-select-none ${className}`;
  return (
    <Form.Check // prettier-ignore
      type={type}
      id={id}
      label={label}
      name={name}
      value={value}
      className={classes}
      onChange={onChange}
    />
  );
}
Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};
Checkbox.defaultProps = {
  placeholder: PropTypes.string.isRequired,
};
