import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ItemsContainer from "./components/ItemsPage/ItemsContainer/ItemsContainer";
import CartItemsContainer from "./components/CartPage/CartItemsContainer/CartItemsContainer";
import HomePage from "./components/HomePage/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={HomePage}></Route>
        <Route exact path={"/Shop"} component={ItemsContainer}></Route>
        <Route exact path={"/Cart"} component={CartItemsContainer}></Route>
      </Switch>
    </BrowserRouter>
  );
}
