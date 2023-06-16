import React from "react";
import "./style/card.scss";

const Card = ({ children, title, backgroundColor, ...props }) => {
  return (
    <section
      className="custom-card"
      style={{ "--bg": backgroundColor ? backgroundColor : "var(--lavender)" }}
    >
      <h1 className="card-title">{title}</h1>
      {children}
    </section>
  );
};

export default Card;
