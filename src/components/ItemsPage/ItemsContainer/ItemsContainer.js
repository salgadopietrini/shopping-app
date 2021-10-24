import axios from "axios";
import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import NavBar from "../../NavBar/NavBar";
import CartPreview from "../CartPreview/CartPreview";
import "./items-container.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

export default function ItemsContainer() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState("5");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setItems((items) => response.data);
    });
  }, []);

  const categories = [
    "Pick a category",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  const selectItem = (id) => {
    if (selectedItems.some((elem) => elem.id === id)) {
    } else {
      setSelectedItems((prevValue) => [...prevValue, items[id - 1]]);
    }
  };

  const removeItem = (id) => {
    if (selectedItems.some((elem) => elem.id === id)) {
      const indexToDelete = selectedItems.findIndex((elem) => elem.id === id);
      setSelectedItems((prevValue) =>
        prevValue
          .slice(0, indexToDelete)
          .concat(prevValue.slice(indexToDelete + 1, prevValue.length))
      );
    } else {
    }
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <NavBar selectedItems={selectedItems} />

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <Box sx={{ minWidth: 120 }} style={{ marginTop: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleCategory}
              >
                <MenuItem value={"5"}>All</MenuItem>
                <MenuItem value={"1"}>Men's Clothing</MenuItem>
                <MenuItem value={"2"}>Women's Clothing</MenuItem>
                <MenuItem value={"3"}>Jewelry</MenuItem>
                <MenuItem value={"4"}>Electronics</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {selectedItems.length > 0 && (
            <Box sx={{ minWidth: 120 }} style={{ marginTop: "15px" }}>
              <Grid container spacing={10} style={{ padding: "24px" }}>
                <Grid key={0} item className="cart-preview">
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    In Cart:
                  </Typography>
                </Grid>
                {selectedItems.length > 0 &&
                  selectedItems.map((elem) => (
                    <Grid
                      key={elem.id}
                      item
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      xl={1}
                      className="cart-preview"
                    >
                      <CartPreview selectedItems={elem} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}

          <Grid container spacing={10} style={{ padding: "24px" }}>
            {items.length > 0 &&
              items
                .filter(
                  (elem) =>
                    elem.category === categories[category] || category === "5"
                )
                .map((elem) => (
                  <Grid key={elem.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                    <ItemCard
                      info={elem}
                      key={elem.id}
                      selectItem={selectItem}
                      removeItem={removeItem}
                    />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
}
