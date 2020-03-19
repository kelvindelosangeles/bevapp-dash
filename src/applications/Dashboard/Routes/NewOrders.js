import React from "react";
import DBStatBar from "../Components/DBStatBar";
import DBOrderHeader from "../Components/DBOrderHeader";
import { connect } from "react-redux";
import DBPreview from "../Components/DBPreview";
import EmptyOrder from "../../../Global/Empty Order/EmptyOrder";
import Orders from "../Components/Orders/Orders";

const NewOrders = ({ activeOrder }) => {
  const OrderPreview = activeOrder ? (
    <DBPreview activeOrder={activeOrder} />
  ) : (
    <EmptyOrder message="Select an order to view it's details" />
  );

  return (
    <React.Fragment>
      <DBStatBar />
      <DBOrderHeader />
      <Orders />
      {OrderPreview}
    </React.Fragment>
  );
};

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(NewOrders);
