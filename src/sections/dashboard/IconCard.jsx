import React from "react";
import { Stack } from "react-bootstrap";
import "./icon-card.scss";
import { useNavigate } from "react-router-dom";

const IconCard = ({ title, subtitle, icon, ...props }) => {
  const navigate = useNavigate();
  let Icon = icon;
  return (
    <Stack
      className="icon-card align-items-center justify-content-center"
      style={{
        "--bg": props.backgroundColor ? props.backgroundColor : "var(--blue)",
        cursor: props.to ? "pointer" : "",
      }}
      onClick={() => {
        if (props.to) {
          navigate(props.to);
        }
      }}
    >
      <span className="circle"></span>
      <span className="circle"></span>
      {icon && (
        <div className="icon">
          <Icon />
        </div>
      )}
      {title && <p className="title">{title}</p>}
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </Stack>
  );
};

export default IconCard;
