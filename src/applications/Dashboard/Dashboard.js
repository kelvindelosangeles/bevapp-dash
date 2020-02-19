import React from "react";

import { connect } from "react-redux";
import styled from "styled-components";

import { Colors } from "../../constants/Colors";

import DBStatBar from "./components/DBStatBar";
import DBSearch from "./components/DBSearch";
import DBOrderHeader from "./components/DBOrderHeader";
import Orders from "./components/Orders/Orders";
import DBPreview from "./components/DBPreview";
import EmptyOrder from "../../Global/Empty Order/EmptyOrder";

const Dashboard = ({ activeOrder }) => {
  const OrderPreview =
    Object.values(activeOrder).length > 0 ? (
      <DBPreview />
    ) : (
      <EmptyOrder message="Select an order to view it's details" />
    );

  return (
    <DashboardWrapper>
      <Main>
        <DBStatBar />
        {/* <DBSearch /> */}
        <DBOrderHeader />
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
