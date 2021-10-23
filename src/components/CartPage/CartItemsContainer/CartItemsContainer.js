import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import CartItem from "../CartItem/CartItem";
import "./cart-items-container.css";

export default function CartItemsContainer(props) {
  const [content, setContent] = useState(() => {
    if (props.location.state.selectedItems) {
      const items = props.location.state.selectedItems;
      items.map((elem) => (elem.quantity = 1));
      return items;
    } else {
      return [];
    }
  });

  const handleQuantity = (id, operation) => {
    setContent((prevValue) =>
      prevValue.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            quantity:
              Number.parseFloat(elem.quantity) + Number.parseFloat(operation),
          };
        } else {
          return elem;
        }
      })
    );
    setContent((prevValue) => prevValue.filter((elem) => elem.quantity > 0));
  };

  return (
    <div>
      <NavBar />

      <div>
        {content.length > 0 ? (
          <div className="cart-items-container">
            <h1>
              Items: {content.reduce((acum, elem) => acum + elem.quantity, 0)}
            </h1>
            {content
              .filter((elem) => elem.quantity > 0)
              .map((elem) => (
                <CartItem
                  info={elem}
                  key={elem.id}
                  handleQuantity={handleQuantity}
                />
              ))}
            <h1>
              Total: ${" "}
              {content.length > 0
                ? content
                    .reduce(
                      (acum, elem) =>
                        acum +
                        Number.parseFloat(elem.price) *
                          Number.parseFloat(elem.quantity),
                      0
                    )
                    .toFixed(2)
                : 0}
            </h1>
          </div>
        ) : (
          <h3>No items yet</h3>
        )}
      </div>
    </div>
  );
}
