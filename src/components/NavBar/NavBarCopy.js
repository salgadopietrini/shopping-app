import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div>
      <Link to={"/Shop"}>Shop</Link>
      <Link
        to={{
          pathname: "/Cart",
          state: { selectedItems: props.selectedItems },
        }}
      >
        Cart
      </Link>
    </div>
  );
}
