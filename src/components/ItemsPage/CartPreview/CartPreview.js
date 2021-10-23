import React from "react";

export default function CartPreview(props) {
  return (
    <div>
      <img src={props.selectedItems.image} alt="Product" width="50px"></img>
    </div>
  );
}
