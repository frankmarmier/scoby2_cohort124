import React from "react";
import "../../styles/ItemDisplay.css";

const ItemDisplay = ({ item, handleClose }) => {
  return (
    <div className="Item-container">
      <p onClick={handleClose} className="close-link">
        Close
      </p>
      <div className="round-image">
        <img className="user-img" src={item.image} alt="item" />
      </div>
      <h2 className="title">{item.name}</h2>
      <div className="info">
        <span>Quantity: {item.quantity}</span> |<span>{item.category}</span>
      </div>
      <p className="description">{item.description}</p>
      <p className="location">{item.formattedAddress}</p>
      <div className="user-info">
        <div className="round-image-user">
          <img src={item.creator.profileImg} alt="user" />
        </div>
        <span>Given away by {item.creator.firstName}</span>
      </div>
      <div className="contact-information">
        Contact {item.creator.firstName} at{" "}
        <b>
          {item.contact === "phone"
            ? item.creator.phoneNumber
            : item.creator.email}
        </b>
      </div>
    </div>
  );
};

export default ItemDisplay;
