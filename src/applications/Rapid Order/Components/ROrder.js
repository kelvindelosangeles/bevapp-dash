import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import uuid from "uuid";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { Colors } from "../../../constants/Colors";
import { CustomersArray } from "../../../Assets/Data/Customers";

import SingleOrderItem from "./SingleOrderItem";

const calcTotal = x => {
  return x
    .reduce((a, b) => {
      return a + b;
    })
    .toFixed(2);
};
const formatTel = tel => {
  return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};

const ROrder = ({ order, dispatch }) => {
  const [customer, setCustomer] = useState(null);

  const orderList = Object.values(order).map(item => {
    return <SingleOrderItem item={item} key={item.id} />;
  });

  const totalCostArray = Object.values(order).map(i => {
    return parseFloat((i.qty * parseFloat(i.price).toFixed(2)).toFixed(2));
  });

  const OrderID = useMemo(() => {
    return moment(new Date()).format("YYMMDD") + uuid().slice(0, 8) + "aa";
  }, []);

  const today = useMemo(() => {
    return moment(new Date()).format("MMM DD, h:mm");
  });

  const customerChangeHandler = (event, value) => {
    setCustomer(value);
  };

  const cancelOrder = () => {
    window.confirm("Are you sure you want to cancel this order") &&
      dispatch({
        type: "CANCEL_ORDER"
      });
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
          <CustomerDetails>
            <div>
              <h3>{customer.name.toUpperCase()}</h3>
              <p>{customer.address}</p>
              <p>{formatTel(customer.telephone)}</p>
              <p>NYC</p>
            </div>
            <div> Map Image</div>
          </CustomerDetails>
        )}
        <OrderDetails>
          <div className="row">
            <div className="detail">
              <h6>Order ID</h6>
              <p>{OrderID}</p>
            </div>
            <div className="detail">
              <h6>Placed By</h6>
              <p>Administrator Account</p>
            </div>
          </div>
          <div className="row">
            <div className="detail">
              <h6>Ordered On</h6>
              <p>{today}</p>
            </div>
            <div className="detail">
              <h6>Status</h6>
              <p id="status">New Order</p>
            </div>
          </div>
        </OrderDetails>
        <OrderItems>
          <header>
            <h6>Order</h6>
            <h6>Cost</h6>
          </header>
          <main>{orderList}</main>
          <footer>
            <h6>Total Cost</h6>
            <h6>${calcTotal(totalCostArray)}</h6>
          </footer>
        </OrderItems>
        <OrderActions>
          <button>Complete Order</button>
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

const CustomerDetails = styled.section`
  display: flex;
  justify-content: space-between;
  h3 {
    font-family: "AvenirNext-Heavy", "Avenir Next", serif;
    font-size: 18px;
    margin-bottom: 8px;
    max-width: 210px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    text-transform: uppercase;
  }
`;
const OrderDetails = styled.section`
  .row {
    display: flex;
    :first-of-type {
      margin-bottom: 24px;
    }
  }
  .detail {
    flex: 1;
  }
  #status {
    color: #22aa99;
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
  }
  h6 {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 14px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 12px;
  }
`;
const OrderItems = styled.section`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  h6 {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 16px;
  }
  main {
    margin-bottom: 40px;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
`;
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

export default connect(state => {
  return { order: state.RapidOrderState.order };
})(ROrder);
