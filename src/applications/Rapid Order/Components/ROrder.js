import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import uuid from "uuid";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { Colors } from "../../../constants/Colors";
import { CustomersArray } from "../../../Assets/Data/Customers";

import CustomerDetails from "../../../global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../global/OrderPreview/OrderDetails";
import OrderItems from "../../../global/OrderPreview/OrderItems";

const formatTel = tel => {
  return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};
const ROrder = ({ order, dispatch }) => {
  const [customer, setCustomer] = useState(null);
  const [error, showError] = useState(false);

  const orderID = useMemo(() => {
    return moment(new Date()).format("YYMMDD") + uuid().slice(0, 8) + "aa";
  }, []);
  const createdAt = useMemo(() => {
    return moment(new Date()).format("MMM DD, h:mm");
  });

  const customerChangeHandler = (event, value) => {
    showError(false);
    setCustomer(value);
  };
  const cancelOrder = () => {
    window.confirm("Are you sure you want to cancel this order") &&
      dispatch({
        type: "CANCEL_ORDER"
      });
  };
  const submitOrder = () => {
    if (!customer) {
      showError(true);
    } else {
      dispatch({
        type: "SUBMIT_ORDER",
        order,
        customer,
        details: {
          orderID,
          createdAt: createdAt,
          createdBy: "Admin"
        }
      });
    }
  };

  // GROUPING CUSTOMERS
  const options = CustomersArray.map(x => {
    const firstLetter = x.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...x
    };
  });

  return (
    <ROrderWrapper>
      <div className="wrapper">
        <CustomerSelect>
          <Autocomplete
            id="combo-box-demo"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={option => option.firstLetter}
            getOptionLabel={option => option.name.toUpperCase()}
            renderInput={params => (
              <TextField
                {...params}
                label="Select a Customer"
                variant="standard"
                fullWidth
              />
            )}
            onChange={customerChangeHandler}
          />
        </CustomerSelect>
        {customer && (
          <CustomerDetails
            name={customer.name}
            address={customer.address}
            telephone={customer.telephone}
          />
        )}
        <OrderDetails
          orderID={orderID}
          createdAt={createdAt}
          status="New Order"
        />
        <OrderItems order={order} />
        {error && (
          <ErrorMessage>
            <p>Please Add a Customer</p>
          </ErrorMessage>
        )}
        <OrderActions>
          <button onClick={submitOrder}>Complete Order</button>
          <button onClick={cancelOrder}>Cancel</button>
        </OrderActions>
      </div>
    </ROrderWrapper>
  );
};

const ROrderWrapper = styled.div`
  position: relative;
  grid-area: rorder;
  height: 100%;
  background-color: ${Colors.white};
  .wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  section {
    padding: 32px;
    border-bottom: 1px solid ${Colors.lightGrey};
  }
`;
const CustomerSelect = styled.section``;

const OrderActions = styled.section`
  display: flex;

  button {
    height: 40px;
    border-radius: 5px;
    border: none;
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    width: 100%;
    color: ${Colors.white};
    background-color: ${Colors.green};
    cursor: pointer;
    :nth-of-type(2) {
      background-color: ${Colors.red};
      margin-left: 16px;
    }
  }
`;
const ErrorMessage = styled.section`
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    color: ${Colors.red};
    text-align: center;
    /* margin-bottom: 16px; */
  }
`;

export default connect(state => {
  return { order: state.RapidOrderState.order };
})(ROrder);
