import React from "react";

import styled from "styled-components";

import StatBar from "./components/StatBar";
import DashboardSearch from "./components/DashboardSearch";
import OrderHeader from "./components/OrderHeader";
import Orders from "./components/Orders/Orders";
import SingleOrder from "./components/Single Orders/SingleOrder";
import { Colors } from "../../constants/Colors";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Main>
        <StatBar />
        <DashboardSearch />
        <OrderHeader />
        <Orders />
      </Main>
      <Aside>
        <SingleOrder />
      </Aside>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  display: flex;
  flex: 1;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
`;
const Aside = styled.div`
  display: flex;
  max-width: 360px;
  flex: 1;
  background-color: ${Colors.white};
`;

export default Dashboard;
