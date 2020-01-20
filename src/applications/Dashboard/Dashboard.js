import React from "react";

import styled from "styled-components";
import StatBar from "./components/StatBar";
import DashboardSearch from "./components/DashboardSearch";
import { Colors } from "../../constants/Colors";
import OrderHeader from "./components/OrderHeader";
import Orders from "./components/Orders";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <StatBar />
      <DashboardSearch />
      <OrderHeader />
      <Orders />
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px 24px;
`;

export default Dashboard;
