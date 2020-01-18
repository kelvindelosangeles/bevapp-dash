import React from "react";
import styled from "styled-components";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./global/Sidebar/Sidebar";

const App = () => {
  return (
    <AppWrapper>
      <Sidebar />
      <Switch>
        <Route exact path="/" />
      </Switch>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  min-height: 800px;
  background-color: beige;
`;

export default App;
