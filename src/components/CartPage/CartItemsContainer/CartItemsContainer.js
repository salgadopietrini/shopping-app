import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import CartItem from "../CartItem/CartItem";
import "./cart-items-container.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

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
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <div>
            {content.length > 0 ? (
              <div className="cart-items-container">
                <h1>
                  Items:{" "}
                  {content.reduce((acum, elem) => acum + elem.quantity, 0)}
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
                  <span style={{ marginRight: "20px" }}>
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
                  </span>
                  <Button variant="outlined" onClick={handleOpen}>
                    Proceed to checkout
                  </Button>
                  <Collapse in={open}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                      severity="warning"
                    >
                      Proceed to checkout function will be available soon!
                    </Alert>
                  </Collapse>
                </h1>
              </div>
            ) : (
              <div>
                <h1>No items yet</h1>
                <h3>Please go to the shop and pick your items</h3>
              </div>
            )}
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}
