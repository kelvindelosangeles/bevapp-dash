import { CancelRounded } from "@material-ui/icons";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import PageHeader from "./PageHeader";
import moment from "moment-timezone";
import { Order as OrdersModel } from "../../../../../Models/Order";
import { cancelOrder, submitOrder } from "../../../../../redux/actions/RapidOrderActions";
import { withFirestore } from "react-redux-firebase";

const OrderSummary = ({ firestore }) => {
    const order = useSelector((state) => state.RapidOrderState);
    const dispatch = useDispatch();

    // DEPRECATED VAR
    const createdAt = useMemo(() => {
        return `${new Date()}`;
    });
    // DEPRECATED VAR

    const submitOrderHandler = () => {
        const NewOrder = {
            customer: order.customer,
            details: {
                new: true,
                complete: false,
                createdAt,
                createdBy: "General Admin",
                orderID: order.orderID,
                notes: "",
            },
            cart: order.cart,
            editedOrder: null,
        };
        // FIXEME: Move this function to actions
        return Object.values(order.cart).length < 1
            ? alert("The order cannot be submited if the cart is empty")
            : firestore
                  .update(
                      {
                          collection: "ordersv2",
                          doc: "orders",
                      },
                      { [order.orderID]: { ...NewOrder } }
                  )
                  .then(() => {
                      console.log("success");
                      dispatch(submitOrder());
                  })
                  .catch((err) => {
                      console.log(err);
                  });
    };

    const cancelOrderHandler = () => {
        window.confirm("Are you sure you want to cancel this order") && dispatch(cancelOrder());
    };

    return (
        <Component>
            <PageHeader>
                <p>Order Summary</p>
                <CancelRounded onClick={cancelOrderHandler} />
            </PageHeader>
            <div className='order-details'>
                <p className='label'>Order Summary</p>
                <p className='value'>{order.orderID}</p>
                <p className='label'>Date</p>
                <p className='value'>{moment(createdAt).format("l")}</p>
                <p className='label'>Customer</p>
                <p className='value'>{order.customer.address}</p>
                <p className='value name'>{order.customer.name}</p>
            </div>
            <div className='totals'>
                <p className='cases'>
                    Cases: <span> {OrdersModel.CalculateCases(order.cart)}</span>
                </p>
                <p className='Total'>
                    Total: <span> $ {OrdersModel.CalculateCart(order.cart, order.customer.specialPrices)}</span>
                </p>
            </div>
            <button onClick={submitOrderHandler}>Complete Order</button>
        </Component>
    );
};
const Component = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    .order-details {
        border-bottom: 1px solid ${Colors.blue};
        margin-bottom: 40px;
        .label {
            font-size: 14px;
            color: ${Colors.greyText};
        }
        .value {
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 600;
        }
        .value.name {
            font-size: 13px;
            margin-top: -16px;
            color: ${Colors.greyText};
            font-weight: unset;
        }
    }
    .totals {
        font-weight: 700;
        color: ${Colors.blue};
        span {
            color: ${Colors.black};
        }
        .cases {
            margin-bottom: 8px;
        }
    }
    button {
        background-color: ${Colors.black};
        color: ${Colors.white};
        width: 100%;
        padding: 18px 0;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 700;
        margin-top: auto;
    }
`;
export default withFirestore(OrderSummary);

// TODO: switch to firestore hook
