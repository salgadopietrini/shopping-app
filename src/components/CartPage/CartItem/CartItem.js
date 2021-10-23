import React from "react";

export default function CartItem(props) {
  const handleClick = (event) => {
    props.handleQuantity(props.info.id, event.target.value);
  };

  return (
    <div className="item-card">
      <div>{props.info.category}</div>
      <div>{props.info.description}</div>
      <div>{props.info.id}</div>
      <div>
        <img src={props.info.image} alt="Product" width="100px"></img>
      </div>
      <div>{props.info.price}</div>
      <div>{props.info.title}</div>
      <h4>
        <button onClick={handleClick} value={1}>
          +
        </button>
      </h4>
      <h4>
        <button onClick={handleClick} value={-1}>
          -
        </button>
      </h4>
    </div>
  );
}
