import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import STToggle from "./Components/STToggle";

import STCustomers from "./Components/STCustomers";
import STBeverages from "./Components/STBeverages";

import Home from "./Store Routes/Home";
import AddBeverage from "./Store Routes/AddBeverage";
import EditBeverage from "./Store Routes/EditBeverage";

const Store = () => {
  const [storeToggle, setStoreToggle] = useState(true);

  const toggleStore = () => {
    setStoreToggle(!storeToggle);
  };

  return (
    <StoreWrapper>
      <main>
        <STToggle storeToggle={storeToggle} toggleStore={toggleStore} />
        {storeToggle ? <STBeverages /> : <STCustomers />}
      </main>
      <Switch>
        <Redirect exact from="/store" to="/store/home" />
        <Route path="/store/home" component={Home} />
        <Route path="/store/addbeverage" component={AddBeverage} />
        <Route path="/store/editbeverage/:id" component={EditBeverage} />
      </Switch>

      {/* <STPreview /> */}
    </StoreWrapper>
  );
};

const StoreWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 390px;
  grid-template-areas: "main preview";
  position: relative;
  height: 100%;
  width: 100%;
  main {
    position: absolute;
    width: 100%;
    /* height: inherit; */
    height: 100%;
    grid-area: main;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 24px 24px 24px;
  }
`;

export default Store;
