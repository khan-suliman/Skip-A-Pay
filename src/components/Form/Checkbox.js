import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./../style/Form/checkbox.scss";

export default function Checkbox({ label, name, type, id }) {
  return (
    <Form.Check // prettier-ignore
      type={type}
      id={id}
      label={label}
      name={name}
      className="custom-checkbox user-select-none"
    />
  );
}
Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
Checkbox.defaultProps = {
  placeholder: PropTypes.string.isRequired,
};
