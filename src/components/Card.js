import React from "react";
import "./style/card.scss";
import { Stack } from "react-bootstrap";

const Card = ({ children, title, actionElement, backgroundColor, ...props }) => {
  return (
    <div
      className="custom-card"
      style={{ "--bg": backgroundColor ? backgroundColor : "var(--lavender)" }}
    >
      <Stack className="align-items-end justify-content-between" direction="horizontal">
        <h1 className="card-title">{title}</h1>
        {actionElement ?? actionElement}
      </Stack>
      {children}
    </div>
  );
};

export default Card;
