import axios from "axios";
import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import NavBar from "../../NavBar/NavBar";
import CartPreview from "../CartPreview/CartPreview";
import "./items-container.css";

export default function ItemsContainer() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState("5");

  const categories = [
    "Pick a category",
    "Men's Clothing",
    "Women's Clothing",
    "Jewelry",
    "Electronics",
    "All",
  ];
  const categoriesBadlyWritten = [
    "Pick a category",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setItems((items) => response.data);
    });
  }, []);

  const selectItem = (id) => {
    if (selectedItems.some((elem) => elem.id === id)) {
    } else {
      setSelectedItems((prevValue) => [...prevValue, items[id - 1]]);
    }
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <NavBar selectedItems={selectedItems} />
      <h2>Category: {categories[category]}</h2>
      <button onClick={handleCategory} value={"5"}>
        All
      </button>
      <button onClick={handleCategory} value={"1"}>
        Men's Clothing
      </button>
      <button onClick={handleCategory} value={"2"}>
        Women's Clothing
      </button>
      <button onClick={handleCategory} value={"3"}>
        Jewelry
      </button>
      <button onClick={handleCategory} value={"4"}>
        Electronics
      </button>

      <div className="items-container">
        {items.length > 0 &&
          items
            .filter(
              (elem) =>
                elem.category === categoriesBadlyWritten[category] ||
                category === "5"
            )
            .map((elem) => (
              <ItemCard info={elem} key={elem.id} selectItem={selectItem} />
            ))}
      </div>
      <h1>
        {selectedItems.length > 0 &&
          selectedItems.map((elem) => <CartPreview selectedItems={elem} />)}
      </h1>
    </div>
  );
}
