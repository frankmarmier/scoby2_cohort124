import React from "react";
import Button from "../Button";
import "../../styles/CardItem.css";

const CardItem = (props) => {
  const { image, name, _id, quantity, description, handleEdit, handleDelete } =
    props;

  return (
    <div className="CardItem">
      <div className="round-image">
        <img src={image} alt={name} />
      </div>
      <div className="description">
        <h2>{name}</h2>
        <h4>Quantity: {quantity}</h4>
        <p>{description}</p>
        <div className="buttons">
          <Button handleClick={(event) => handleDelete(_id)} secondary>
            Delete
          </Button>
          <Button handleClick={(event) => handleEdit(_id)} primary>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
