import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Global/Sidebar/Sidebar";
import AppHeader from "./Global/AppHeader/AppHeader";
import Dashboard from "./Applications/Dashboard/Dashboard";
import RapidOrder from "./Applications/Rapid Order/RapidOrder";

import { Colors } from "./Constants/Colors";
import Store from "./Applications/Store/Store";

const App = () => {
  return (
    <AppWrapper>
      <Sidebar />
      <AppContainer>
        <AppHeader />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/rapidorder" component={RapidOrder} />
          <Route exact path="/store" component={Store} />
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
