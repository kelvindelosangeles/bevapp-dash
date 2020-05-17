import React, { useRef } from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import Notes from "../../../Global/OrderPreview/Notes";
import OrderCart from "../../../Global/OrderPreview/OrderCart";
// TEST
import { PDFDownloadLink } from "@react-pdf/renderer";
import CustomerPDF from "../../../Global/PrintTemplates/CustomerPDF";
import WarehousePDF from "../../../Global/PrintTemplates/WarehousePDF";

const DBPreview = ({ activeOrder, dispatch, firestore, orders, history }) => {
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    const complete = activeOrder.details.complete;
    // BETA
    const editOrderID = useSelector((state) => state.RapidOrderState.editOrderID);

    const deleteOrderHandler = () => {
        const { [activeOrder.details.orderID]: removed, ...NewOrder } = orders;
        // BETA
        // activeOrder.details.orderID === editOrderID &&
        //     window.confirm("This order is currently being edited, Are you sure you want to delete this order and clear the Rapid Order Cart?") &&
        window.confirm("Are you sure you want to delete this order?  This action is irreversable.") &&
            firestore
                .set(
                    {
                        collection: "deletedOrders",
                        doc: activeOrder.details.orderID,
                    },
                    activeOrder
                )
                .then(() => {
                    firestore.set(
                        {
                            collection: "orders",
                            doc: "orders",
                        },
                        NewOrder
                    );
                })
                .then(() => {
                    dispatch({
                        type: "DELETE_ORDER",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    alert("Something Went Wrong Please Contact Admin");
                });
    };
    const completeClickHandler = () => {
        window.confirm("Would you like to complete this order?") &&
            dispatch({ type: "CLEAR_ACTIVE_ORDER" }) &&
            firestore.update(
                {
                    collection: "orders",
                    doc: "orders",
                },
                {
                    [activeOrder.details.orderID]: {
                        ...activeOrder,
                        details: { ...activeOrder.details, complete: true },
                    },
                }
            );
    };

    // BETA
    const ROCart = useSelector((state) => state.RapidOrderState.cart);
    const BETAeditOrderHandler = () => {
        const startEditingOrder = () => {
            dispatch({
                type: "SET_EDIT_ORDER_CART",
                payload: {
                    cart: activeOrder.cart,
                    orderID: activeOrder.details.orderID,
                    customer: activeOrder.customer,
                },
            });
            dispatch({
                type: "SET_NOTE",
                payload: activeOrder.details.notes,
            });
            history.push("/rapidOrder");
        };
        Object.values(ROCart).length > 0
            ? alert("You have items in your rapid order cart.  Please submit or cancel your order before editing this order.")
            : startEditingOrder();
    };

    return (
        <Container>
            <div className='wrapper'>
                <CustomerDetails name={activeOrder.customer.name} address={activeOrder.customer.address} telephone={activeOrder.customer.telephone} />
                <OrderDetails orderID={activeOrder.details.orderID} createdAt={activeOrder.details.createdAt} status='Pending Review' />
                {activeOrder.details.notes && <Notes text={activeOrder.details.notes} />}
                <OrderCart cart={activeOrder.cart} customer={activeOrder.customer} readOnly={true} />
                <OrderActions>
                    <PDFDownloadLink
                        document={<WarehousePDF order={activeOrder} beverages={beverages} />}
                        fileName={`${activeOrder.customer.address}-WH.pdf`}>
                        {({ loading, error }) => (error ? console.log(error) : loading ? "Loading..." : "Warehouse PDF")}
                    </PDFDownloadLink>
                    <PDFDownloadLink document={<CustomerPDF order={activeOrder} />} fileName={`${activeOrder.customer.address}-CX.pdf`}>
                        {({ loading }) => (loading ? "Loading..." : "Customer PDF")}
                    </PDFDownloadLink>
                    {!complete && (
                        <a onClick={completeClickHandler} id='complete'>
                            Complete{" "}
                        </a>
                    )}
                    {!complete && (
                        <a onClick={deleteOrderHandler} id='delete'>
                            Delete
                        </a>
                    )}
                </OrderActions>
                {!complete && (
                    <Beta>
                        <p>Test Feature</p>
                        <button onClick={BETAeditOrderHandler}>Edit Order</button>
                    </Beta>
                )}
            </div>
        </Container>
    );
};

const Beta = styled.div`
    padding: 32px;
    p {
        font-size: 16px;
        margin-bottom: 24px;
        font-weight: 600;
        text-align: center;
    }
    button {
        height: 40px;
        width: 100%;
        border-radius: 4px;
        border: none;

        font-weight: 500;
        font-size: 16px;
        background-color: #ffcc00;
        color: black;
    }
`;
const Container = styled.div`
    grid-area: preview;
    position: relative;
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
const OrderActions = styled.section`
    display: grid;
    grid-column-gap: 16px;
    grid-row-gap: 24px;
    grid-template-columns: repeat(2, 1fr);
    #complete {
        background-color: ${Colors.green};
    }
    #delete {
        background-color: ${Colors.red};
    }
    a {
        background-color: black;
        color: white;
        padding: 14px 0;
        border-radius: 4px;
        border: none;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
`;

export default compose(
    connect((state) => {
        return { orders: state.Firestore.data.orders.orders };
    }),
    firestoreConnect()
)(withRouter(DBPreview));
