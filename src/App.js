import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Sidebar from "./global/Sidebar/Sidebar";
import Dashboard from "./applications/Dashboard/Dashboard";
import RapidOrder from "./applications/Rapid Order/RapidOrder";

import styled from "styled-components";
import AppHeader from "./global/AppHeader/AppHeader";

const App = () => {
  return (
    <AppWrapper>
      <Sidebar />
      <AppContainer>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/rapidorder" component={RapidOrder} />
        </Switch>
      </AppContainer>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  min-height: 800px;
`;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: orange;
`;

export default App;
