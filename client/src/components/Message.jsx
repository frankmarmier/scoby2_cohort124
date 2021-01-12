import React from "react";
import "../styles/Message.css";

const Message = ({ children, icon, ...rest }) => {
  const classes = {
    danger: "danger",
    info: "info",
    success: "success",
  };

  let selectedClass;
  for (const key in rest) {
    if (classes[key]) selectedClass = classes[key];
  }

  return (
    <p className={`Message ${selectedClass}`}>
      <img className="icon" src={`/media/${icon}.svg`} alt={icon} />
      {children}
    </p>
  );
};

export default Message;
