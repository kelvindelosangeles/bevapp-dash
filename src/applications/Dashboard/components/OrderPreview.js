import React from "react";
import styled from "styled-components";
import { Order as orderModel } from "../../../Models/Order";
import moment from "moment";
import OptionsIcon from "@material-ui/icons/BlurCircularRounded";
import { Colors } from "../../../Constants/Colors";
import Popover from "@material-ui/core/Popover";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, deleteOrder } from "../../../redux/actions/RapidOrderActions";
import { useFirestore } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import CustomerPDF from "../../../Global/PrintTemplates/CustomerPDF";
import WarehousePDF from "../../../Global/PrintTemplates/WarehousePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const OrderPreview = ({ order, history, closeOrderPreview }) => {
    // close order preview comes from the parent so that we can close the entire menu from within the action creators
    const { customer, details, cart } = order;
    const [open, setOpen] = useState(false);
    const anchor = useRef();
    const dispatch = useDispatch();
    const firestore = useFirestore();
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    const ReturnSpecialPrice = (id) => {
        try {
            return "$" + customer.specialPrices[id].price;
        } catch (error) {
            return null;
        }
    };

    const CalcOrderMargin = () => {
        return (orderModel.CalculateCart(cart, null) - orderModel.CalculateCart(cart, customer.specialPrices)).toFixed(2);
    };

    return (
        <Component>
            <OptionsIcon
                ref={anchor}
                className='order-options'
                onClick={() => {
                    setOpen(true);
                }}
            />
            <div className='order-details'>
                <CustomerDetails>
                    <p className='name'>{customer.name}</p>
                    <p className=''>{customer.address}</p>
                    <p className=''>{orderModel.formatTel(customer.telephone)}</p>
                    <p className=''>{customer.city}</p>
                </CustomerDetails>
                <OrderDetails>
                    <section>
                        <p className='heading'>Order ID</p>
                        <p>{details.orderID.slice(7, 16)}</p>
                    </section>
                    <section>
                        <p className='heading'>Ordered On</p>
                        <p>{moment(details.createdAt).format("L")}</p>
                    </section>
                    <section>
                        <p className='heading'>Placed By</p>
                        <p>{details.createdBy}</p>
                    </section>
                    <section>
                        <p className='heading'>Status</p>
                        <p>{details.status}</p>
                    </section>
                </OrderDetails>
                <OrderDetails margin={parseFloat(CalcOrderMargin())}>
                    <section>
                        <p className='heading'>Cases</p>
                        <p>{orderModel.CalculateCases(cart)}</p>
                    </section>
                    <section>
                        <p className='heading'>Total Margin</p>
                        <p className='margin'>${CalcOrderMargin()}</p>
                    </section>
                    <section>
                        <p className='heading'>Total</p>
                        <p className='total'>${orderModel.CalculateCart(cart, customer.specialPrices)}</p>
                    </section>
                    <section>
                        <p className='heading'></p>
                        <p></p>
                    </section>
                </OrderDetails>
                <Notes>
                    <p className='header'>Notes</p>
                    <p className='notes'>{details.notes}</p>
                </Notes>
            </div>
            <div className='cart-header'>
                <p>QTY</p>
                <p>ID</p>
                <p>Description</p>
                <p>Cost</p>
                <p>SP.Price</p>
                <p>Total</p>
            </div>
            <Cart>
                {Object.values(cart).map((i) => {
                    return (
                        <div className='item'>
                            <p>{i.qty} x</p>
                            <p>{i.id}</p>
                            <p>{i.description}</p>
                            <p>${i.price}</p>
                            <p className='special-price'>{ReturnSpecialPrice(i.id)}</p>
                            <p>{orderModel.CalculateItem(i, customer.specialPrices)}</p>
                        </div>
                    );
                })}
            </Cart>
            <Popover
                open={open}
                anchorEl={anchor.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <Menu>
                    <p className='pdf'>
                        <PDFDownloadLink
                            document={<WarehousePDF order={order} beverages={beverages} />}
                            fileName={`${order.customer.address}-WH.pdf`}>
                            {({ loading }) => (loading ? "Loading document..." : "Warehouse PDF")}
                        </PDFDownloadLink>
                    </p>
                    <p className='pdf'>
                        <PDFDownloadLink document={<CustomerPDF order={order} />} fileName={`${order.customer.address}-CX.pdf`}>
                            {({ loading }) => (loading ? "Loading document..." : "Customer PDF")}
                        </PDFDownloadLink>
                    </p>
                    <p className='edit' onClick={() => dispatch(editOrder(order, history))}>
                        Edit Order
                    </p>
                    <p className='delete' onClick={() => dispatch(deleteOrder(order, firestore, closeOrderPreview))}>
                        Delete Order
                    </p>
                </Menu>
            </Popover>
        </Component>
    );
};
const Component = styled.div`
    position: relative;
    padding: 32px;
    padding-top: 0;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 64px;
    grid-template-areas:
        "actions actions actions actions"
        "orderDetails orderDetails orderDetails orderDetails"
        "cart-header cart-header cart-header cart-header"
        "cart cart cart cart";
    .order-details {
        grid-area: orderDetails;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 40px;
        background-color: ${Colors.lightGrey};
        padding: 32px;
        margin: 0 -32px;
    }
    .cart-header {
        grid-area: cart-header;
        display: grid;
        font-weight: 700;
        grid-template-columns: 60px 100px 1fr 100px 100px 100px;
        border-top: 1px solid ${Colors.lightGrey};
        margin: 24px -24px;
        padding: 16px 32px;
    }
    .order-options {
        position: absolute;
        top: 24px;
        right: 24px;
        cursor: pointer;
    }
`;

const CustomerDetails = styled.div`
    text-transform: uppercase;
    display: grid;
    grid-row-gap: 12px;
    .name {
        font-weight: 700;
        font-size: 18px;
    }
    p {
        font-size: 16px;
    }
`;
const OrderDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 16px;
    grid-gap: 16px;
    p.heading {
        font-weight: 700;
        margin-bottom: 8px;
        text-transform: uppercase;
    }
    p {
        white-space: nowrap;
    }
    p.total {
        color: ${Colors.blue};
        font-weight: 600;
    }
    p.margin {
        color: ${({ margin }) => (margin === 0 ? null : margin > 0 ? Colors.red : Colors.green)};
    }
`;
const Notes = styled.div`
    display: grid;
    grid-template-rows: min-content 1fr;

    .header {
        text-align: center;
        margin-bottom: 16px;
    }
    .notes {
        border: 1px solid ${Colors.lightGrey};
        padding: 4px;
    }
`;
const Cart = styled.div`
    grid-area: cart;
    .item {
        :nth-of-type(even) {
            background-color: ${Colors.lightGrey};
        }
        .special-price {
            color: ${Colors.purple};
        }
        display: grid;
        grid-template-columns: 60px 100px 1fr 100px 100px 100px;
        font-weight: 500;
        font-size: 16px;
        margin-left: -24px;
        margin-right: -24px;
        padding: 16px 32px;
    }
`;

const Menu = styled.div`
    display: grid;
    p {
        padding: 16px 32px;
        font-size: 16px;
        font-weight: 600;
        border: 1px solid ${Colors.lightGrey};
        cursor: pointer;
    }
    .pdf {
        a {
            color: ${Colors.black};
        }
        :hover {
            background-color: ${Colors.black};
            a {
                color: ${Colors.white};
            }
        }
    }
    .edit {
        :hover {
            background-color: ${Colors.yellow};
        }
    }
    .delete {
        :hover {
            background-color: ${Colors.red};
            color: ${Colors.white};
        }
    }
`;
export default withRouter(OrderPreview);

// TODO: refactor this code and split areas into individual components
