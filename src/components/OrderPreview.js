import React, { useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Order as orderModel } from "../Models/Order";
import moment from "moment";
import OptionsIcon from "@material-ui/icons/BlurCircularRounded";
import { Colors } from "../Constants/Colors";
import Popover from "@material-ui/core/Popover";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, deleteOrder, deleteDraft } from "../redux/actions/RapidOrderActions";
import { useFirestore } from "react-redux-firebase";
import CustomerPDF from "../Global/PrintTemplates/CustomerPDF";
import WarehousePDF from "../Global/PrintTemplates/WarehousePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";

const OrderPreview = (props) => {
    // close order preview comes from the parent so that we can close the entire menu from within the action creators
    const {
        order,
        history,
        closeOrderPreview,
        canEdit = false,
        canDelete = false,
        canDeleteDraft = false,
        canAddPayment = false,
        genInvoice = false,
        genCheck = false,
        recoverDraft,
        completedDate,
        parentRoute,
        weekDocument,
        weekDocumentID,
    } = props;
    const { register, watch, handleSubmit } = useForm({
        defaultValues: {
            priceAdjustment: 0,
            breakage: 0,
            returnedContainers: 0,
            returnedToFlair: 0,
            cash: 0,
            check: 0,
            notes: "",
        },
    });
    const { customer, details, cart } = order;
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [paymentReportOpen, setPaymentReportOpen] = useState(false);
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

    const totalCredit = (
        parseFloat(watch("priceAdjustment")) +
        parseFloat(watch("breakage")) +
        parseFloat(watch("returnedContainers")) +
        parseFloat(watch("returnedToFlair"))
    ).toFixed(2);
    const totalPayment = (parseFloat(watch("cash")) + parseFloat(watch("check"))).toFixed(2);

    const submitPaymentHandler = (data) => {
        const { priceAdjustment, breakage, returnedContainers, returnedToFlair, cash, check, notes } = data;
        const payment = {
            createdAt: moment().valueOf(),
            createdBy: "General Admin",
            credits: {
                priceAdjustment,
                breakage,
                returnedContainers,
                returnedToFlair,
            },
            payments: {
                cash,
                check,
            },
            notes,
            totalCredit,
            totalPayment,
        };
        const updatedRoute = {
            [parentRoute.details.routeID]: {
                ...parentRoute,
                orders: {
                    ...parentRoute.orders,
                    [order.details.orderID]: {
                        ...order,
                        payment,
                    },
                },
            },
        };

        firestore
            .update(
                {
                    collection: "ordersv2",
                    doc: weekDocumentID,
                },
                updatedRoute
            )
            .then(() => {
                console.log("successfully paid");
                setOpenPayment(false);
                history.push("/dashboard/completedorders");
            })
            .catch((err) => {
                console.log(err, "something went wrong with the payment update process");
            });
    };

    const cancelPaymentHandler = () => {
        window.confirm("Are you sure you want to cancle this payment entry") && setOpenPayment(false);
    };

    const isPaid = order.hasOwnProperty("payment");

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
                            <div>
                                <p>{i.description}</p>
                                {i.hasOwnProperty("flavors") &&
                                    Object.entries(i.flavorsQuantity)
                                        .filter((a) => {
                                            return !a[1] == "" && a[1] !== "0";
                                        })
                                        .map((x) => <p className='flavor'>{`${x[0].toLowerCase()} x ${x[1]}`}</p>)}
                            </div>
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
                    {genCheck && (
                        <p className='pdf'>
                            <PDFDownloadLink
                                document={<WarehousePDF order={order} beverages={beverages} />}
                                fileName={`${order.customer.address}-WH.pdf`}>
                                {({ loading }) => (loading ? "Loading document..." : "Warehouse PDF")}
                            </PDFDownloadLink>
                        </p>
                    )}
                    {genInvoice && (
                        <p className='pdf'>
                            <PDFDownloadLink
                                document={<CustomerPDF order={order} date={completedDate} />}
                                fileName={`${order.customer.address}-CX.pdf`}>
                                {({ loading }) => (loading ? "Loading document..." : "Create Invoice")}
                            </PDFDownloadLink>
                        </p>
                    )}
                    {canEdit && (
                        <p className='edit' onClick={() => dispatch(editOrder(order, history))}>
                            Edit Order
                        </p>
                    )}
                    {recoverDraft && (
                        <p className='edit' onClick={() => dispatch(editOrder(order, history))}>
                            Recover Draft
                        </p>
                    )}
                    {canDelete && (
                        <p className='delete' onClick={() => dispatch(deleteOrder(order, firestore, closeOrderPreview))}>
                            Delete Order
                        </p>
                    )}
                    {canDeleteDraft && (
                        <p className='delete' onClick={() => dispatch(deleteDraft(order.details.orderID, history))}>
                            Delete Draft
                        </p>
                    )}
                    {canAddPayment && !isPaid && (
                        <p className='edit' onClick={() => setOpenPayment(true)}>
                            Add Payment
                        </p>
                    )}
                    {isPaid && (
                        <p className='edit' onClick={() => setPaymentReportOpen(true)}>
                            Payment Summary
                        </p>
                    )}
                </Menu>
            </Popover>
            <Dialog open={openPayment} fullWidth scroll='paper'>
                <PaymentForm onSubmit={handleSubmit(submitPaymentHandler)}>
                    <DialogTitle>
                        <p style={{ textAlign: "center" }}>Add Payment Details</p>
                        <div className='payment-breakdown'>
                            <div className='stat'>
                                <Typography variant='overline'>Order Total</Typography>
                                <Typography variant='caption'>{orderModel.CalculateCart(order.cart, order.customer.specialPrices)}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='overline'>Credits </Typography>
                                <Typography variant='caption'>$ {totalCredit}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='overline'> Payment</Typography>
                                <Typography variant='caption'>$ {totalPayment}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='overline'></Typography>
                                <Typography variant='caption'></Typography>
                            </div>
                        </div>
                        <Divider />
                    </DialogTitle>
                    <DialogContent>
                        <div className='input-set'>
                            <Typography variant='overline' className='set-title'>
                                Credits
                            </Typography>
                            <div className='input-group'>
                                <Typography variant='caption'>Price Adjustment</Typography>
                                <input
                                    type='number'
                                    step='.01'
                                    name='priceAdjustment'
                                    min={0}
                                    max={1000}
                                    ref={register({ required: true, min: 0, max: 1000 })}
                                    placeholder='$0.00'
                                />
                            </div>
                            <div className='input-group'>
                                <Typography variant='caption'>Breakage</Typography>
                                <input
                                    type='number'
                                    step='.01'
                                    name='breakage'
                                    ref={register({ required: true, min: 0, max: 1000 })}
                                    placeholder='$0.00'
                                />
                            </div>
                            <div className='input-group'>
                                <Typography variant='caption'>Returned cans/bottles</Typography>
                                <input
                                    type='number'
                                    step='.01'
                                    name='returnedContainers'
                                    ref={register({ required: true, min: 0, max: 1000 })}
                                    placeholder='$0.00'
                                />
                            </div>
                            <div className='input-group'>
                                <Typography variant='caption'>Merchandise returned to Flair</Typography>
                                <input
                                    type='number'
                                    step='.01'
                                    name='returnedToFlair'
                                    ref={register({ required: true, min: 0, max: 1000 })}
                                    placeholder='$0.00'
                                />
                            </div>
                        </div>

                        <div className='input-set'>
                            <Typography variant='overline' className='set-title'>
                                Payment Methods
                            </Typography>
                            <div className='input-group'>
                                <Typography variant='caption'>Cash</Typography>
                                <input
                                    type='number'
                                    step='.01'
                                    name='cash'
                                    min={0}
                                    max={1000}
                                    ref={register({ required: true, min: 0, max: 1000 })}
                                    placeholder='$0.00'
                                />
                            </div>
                            <div className='input-group'>
                                <Typography variant='caption'>Check</Typography>
                                <input
                                    type='number'
                                    step='.01'
                                    name='check'
                                    min={0}
                                    max={1000}
                                    ref={register({ required: true, min: 0, max: 1000 })}
                                    placeholder='$0.00'
                                />
                            </div>
                        </div>
                        <div className='input-set'>
                            <Typography variant='overline'>Admin</Typography>
                            <div className='input-group'>
                                <Typography variant='caption'>Notes</Typography>
                                <textarea name='notes' rows={3} ref={register({ required: false })}></textarea>
                            </div>
                        </div>
                        <Divider />
                    </DialogContent>
                    <DialogActions>
                        <Button size='large' type='submit' variant='contained' color='primary'>
                            Submit
                        </Button>
                        <Button size='large' type='button' variant='contained' color='secondary' onClick={cancelPaymentHandler}>
                            Cancel
                        </Button>
                    </DialogActions>
                </PaymentForm>
            </Dialog>
            <Dialog open={paymentReportOpen} onClose={() => setPaymentReportOpen(false)} fullWidth scroll='paper'>
                <PaymentReport>
                    <DialogTitle>
                        <Typography variant='overline'>Payment Report</Typography>
                        <header>
                            <div className='stat'>
                                <Typography variant='caption'>Order Total</Typography>
                                <Typography variant='subtitle2'>$ {orderModel.CalculateCart(order.cart, order.customer.specialPrices)}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='caption'>Credits</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.totalCredit}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='caption'>Total payments</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.totalPayment}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='caption'>Driver</Typography>
                                <Typography variant='subtitle2'>{parentRoute?.driver.firstName}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='caption'>Date</Typography>
                                <Typography variant='subtitle2'>{moment(parentRoute?.details.completedAt.toDate()).format("L")}</Typography>
                            </div>
                        </header>
                        <Divider />
                    </DialogTitle>
                    <DialogContent>
                        <section>
                            <Typography variant='overline'>Credits</Typography>
                            <div className='value'>
                                <Typography variant='caption'>Price adjustment</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.credits.priceAdjustment}</Typography>
                            </div>
                            <div className='value'>
                                <Typography variant='caption'>Breakage</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.credits.breakage}</Typography>
                            </div>
                            <div className='value'>
                                <Typography variant='caption'>Returned cans/bottles</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.credits.returnedContainers}</Typography>
                            </div>
                            <div className='value'>
                                <Typography variant='caption'>Merchandise returned to Flair</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.credits.returnedToFlair}</Typography>
                            </div>
                            <Divider />
                        </section>
                        <section>
                            <Typography variant='overline'>Payment Methods</Typography>
                            <div className='value'>
                                <Typography variant='caption'>Cash</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.payments.cash}</Typography>
                            </div>
                            <div className='value'>
                                <Typography variant='caption'>Check</Typography>
                                <Typography variant='subtitle2'>$ {order.payment?.payments.check}</Typography>
                            </div>
                        </section>
                        <section>
                            <Typography variant='overline'>Notes</Typography>
                            <Typography variant='body2'>{order.payment?.notes}</Typography>
                            <Divider />
                        </section>
                    </DialogContent>
                    <DialogActions>
                        <Button size='large' variant='contained' color='primary'>
                            Print Report
                        </Button>
                        <Button size='large' variant='outlined' color='primary' onClick={() => setPaymentReportOpen(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </PaymentReport>
            </Dialog>
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
        .flavor {
            font-weight: 500;
            margin-left: 16px;
            text-transform: capitalize;
        }
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
const PaymentForm = styled.form`
    padding: 24px;
    .payment-breakdown {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 12px 0;
        .stat {
            display: grid;
            justify-items: center;
        }
    }
    .input-set {
        display: grid;
        grid-row-gap: 8px;
        margin-bottom: 24px;
        .set-title {
        }
    }
    .input-group {
        display: grid;
        margin-left: 16px;
        input,
        textarea {
            background-color: ${Colors.lightGrey};
            border: none;
            height: 40px;
            padding: 8px;
        }
    }
`;

const PaymentReport = styled.div`
    padding: 24px;
    header {
        display: grid;
        grid-template-columns: repeat(5, auto);
        grid-column-gap: 12px;
        margin-bottom: 24px;
    }
    section {
        display: grid;
        grid-row-gap: 12px;
        margin-bottom: 24px;
        .value {
            display: flex;
            justify-content: space-between;
        }
    }
`;
export default withRouter(OrderPreview);

// TODO: refactor this code and split areas into individual components
