import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import styled from "styled-components";

import Sidebar from "./global/Sidebar/Sidebar";
import AppHeader from "./global/AppHeader/AppHeader";
import Dashboard from "./applications/Dashboard/Dashboard";
import RapidOrder from "./applications/Rapid Order/RapidOrder";

import { Colors } from "./constants/Colors";

const App = () => {
  return (
    <AppWrapper>
      <Sidebar />
      <AppContainer>
        <AppHeader />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
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
  min-width: 1430px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${Colors.lightGrey};
`;

export default App;
