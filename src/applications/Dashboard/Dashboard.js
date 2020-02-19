import React from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";

import StatBar from "./components/StatBar";
import DashboardSearch from "./components/DashboardSearch";
import OrderHeader from "./components/OrderHeader";
import Orders from "./components/Orders/Orders";
import DashPreview from "./components/DashPreview";
import EmptyOrder from "../Rapid Order/Components/EmptyOrder";

const Dashboard = ({ activeOrder }) => {
  const OrderPreview =
    Object.values(activeOrder).length > 0 ? (
      <DashPreview />
    ) : (
      <EmptyOrder message="Select an order to view it's details" />
    );

  return (
    <DashboardWrapper>
      <Main>
        <StatBar />
        <DashboardSearch />
        <OrderHeader />
        <Orders />
      </Main>
      <Aside>{OrderPreview}</Aside>
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
  width: 390px;
  max-width: 390px;
  flex: 1;
  background-color: ${Colors.white};
`;

export default connect(state => {
  return { activeOrder: state.DashboardState.activeOrder };
})(Dashboard);
