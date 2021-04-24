import { Dialog } from "@material-ui/core";
import { SyncProblem } from "@material-ui/icons";
import moment from "moment-timezone";
import { Receipt, Storefront } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import colors from "../../constants/Colors";
import { closePaymentForm, signPayment, postPayment } from "../../redux/actions/paymentFormActions/index";
import { calculateOrder, formatPhoneNumber } from "../../utilities/methods";

const PostPayment = () => {
    const open = useSelector((state) => state.PaymentForm.open);
    const dispatch = useDispatch();
    const firestore = useFirestore();
    const { register, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            cash: 0,
            check: 0,
            breakage: 0,
            priceAdjustment: 0,
            returnedContainers: 0,
            returnedToFlair: 0,
        },
        shouldUnregister: false,
    });
    const order = useSelector((state) => state.PaymentForm.order);
    // const route = useSelector((state) => state.PaymentForm.route);
    const { customer, details, payment, cart, routeDate } = order;
    const [totalPayment, setTotalPayment, testRef] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);
    const [totalCashCheck, setTotalCashCheck] = useState(0);

    const focusHandler = (e) => e.target.select();
    const submitHandler = (data) => {
        dispatch(postPayment(data, totalCashCheck, totalCredits, firestore));
    };
    const closeHandler = () => {
        dispatch(closePaymentForm());
    };
    const signHandler = () => {
        const notes = watch("notes");
        dispatch(signPayment(notes, firestore));
    };
    const showPaymentStatusHandler = () => {
        const invoiceAmount = parseFloat(calculateOrder(order).substring(1));
        if (payment && payment.sign) {
            return (
                <div className='pill' style={{ backgroundColor: colors.purple }}>
                    <p>Signed</p>
                </div>
            );
        }
        if (totalPayment == 0) {
            return null;
        }
        if (totalPayment == invoiceAmount) {
            return (
                <div className='pill' style={{ backgroundColor: colors.green }}>
                    <p>Paid</p>
                </div>
            );
        }
        if (invoiceAmount - totalPayment > 0) {
            return (
                <div className='pill' style={{ backgroundColor: colors.orange }}>
                    <p>Partial Payment</p>
                </div>
            );
        }
        if (totalPayment > invoiceAmount) {
            return (
                <div className='pill' style={{ backgroundColor: colors.red }}>
                    <p>error</p>
                </div>
            );
        }
    };

    useEffect(() => {
        // This use effect keeps the total payment up to date
        const check = parseFloat(Number(watch("check")));
        const cash = parseFloat(Number(watch("cash")));
        const breakage = parseFloat(Number(watch("breakage")));
        const priceAdjustment = parseFloat(Number(watch("priceAdjustment")));
        const returnedContainers = parseFloat(Number(watch("returnedContainers")));
        const returnedToFlair = parseFloat(Number(watch("returnedToFlair")));

        setTotalPayment((cash + check + breakage + priceAdjustment + returnedContainers + returnedToFlair).toFixed(2));
    }, [watch("cash"), watch("check"), watch("breakage"), watch("priceAdjustment"), watch("returnedContainers"), watch("returnedToFlair")]);
    useEffect(() => {
        // This use effect keeps the total credits up to date
        const breakage = parseFloat(Number(watch("breakage")));
        const priceAdjustment = parseFloat(Number(watch("priceAdjustment")));
        const returnedContainers = parseFloat(Number(watch("returnedContainers")));
        const returnedToFlair = parseFloat(Number(watch("returnedToFlair")));

        setTotalCredits((breakage + priceAdjustment + returnedContainers + returnedToFlair).toFixed(2));
    }, [watch("breakage"), watch("priceAdjustment"), watch("returnedContainers"), watch("returnedToFlair")]);
    useEffect(() => {
        // This use effect keeps the total Cash/Check up to date
        const check = parseFloat(Number(watch("check")));
        const cash = parseFloat(Number(watch("cash")));

        setTotalCashCheck((cash + check).toFixed(2));
    }, [watch("cash"), watch("check")]);
    useEffect(() => {
        // This use effect populates the form if there was a previous payment made
        const populateExistingPaymentValues = () => {
            const { credits, payments, notes } = order.payment;
            const { cash, check } = payments;
            const { breakage, priceAdjustment, returnedContainers, returnedToFlair } = credits;
            setValue("cash", cash);
            setValue("check", check);
            setValue("breakage", breakage);
            setValue("priceAdjustment", priceAdjustment);
            setValue("returnedContainers", returnedContainers);
            setValue("returnedToFlair", returnedToFlair);
            setValue("notes", notes);
        };

        order.payment && console.log("populating payment");
        order.payment && populateExistingPaymentValues();
    }, []);

    return (
        <Dialog open={open} scroll='paper' disableBackdropClick>
            <Component onSubmit={handleSubmit(submitHandler)}>
                <header>
                    <p className='title'>Payment Form</p>
                    <section className='customer'>
                        <div className='label'>
                            <Storefront /> Customer
                        </div>
                        <p>{customer.address}</p>
                        <p>{formatPhoneNumber(customer.telephone)}</p>
                    </section>
                    <section className='order_details'>
                        <div className='label'>
                            <Receipt /> Order Details
                        </div>
                        <p>Date: {moment(routeDate).format("L")}</p>
                        <p>
                            Total: <span>{calculateOrder(order)}</span>
                        </p>
                    </section>
                </header>
                <section className='payments form'>
                    <p className='section_label'>
                        Payments: <span>${totalCashCheck}</span>
                    </p>
                    <div className='input_group'>
                        <p className='label'>Cash</p>
                        <div className='input_wrapper'>
                            <input type='number' step='any' name='cash' min={0} ref={register()} onFocus={focusHandler} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Check</p>
                        <div className='input_wrapper'>
                            <input type='number' step='any' name='check' min={0} ref={register()} onFocus={focusHandler} />
                        </div>
                    </div>
                </section>
                <section className='credits form'>
                    <p className='section_label'>
                        Credits: <span>${totalCredits}</span>
                    </p>
                    <div className='input_group'>
                        <p className='label'>Breakage</p>
                        <div className='input_wrapper'>
                            <input type='number' step='any' name='breakage' min={0} ref={register()} onFocus={focusHandler} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Price Adjustment</p>
                        <div className='input_wrapper'>
                            <input type='number' step='any' name='priceAdjustment' min={0} ref={register()} onFocus={focusHandler} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Returned Cans/Bottles</p>
                        <div className='input_wrapper'>
                            <input type='number' step='any' name='returnedContainers' min={0} ref={register()} onFocus={focusHandler} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Merchandise Returned to Flair</p>
                        <div className='input_wrapper'>
                            <input type='number' step='any' name='returnedToFlair' min={0} ref={register()} onFocus={focusHandler} />
                        </div>
                    </div>
                </section>
                <section className='notes form'>
                    <div className='input_group'>
                        <p className='label'>Notes</p>
                        <textarea rows='4' type='text' name='notes' ref={register()} />
                    </div>
                </section>
                <section className='summary'>
                    <p className='section_label'>Payment Summary</p>
                    <div className='stat'>
                        <p className='label'>Invoice Total</p>
                        <p className='value'>{calculateOrder(order)}</p>
                    </div>
                    <div className='stat'>
                        <p className='label'>Payment Total</p>
                        <p className='value'>${totalPayment}</p>
                    </div>
                    <div className='stat'>
                        <p className='label'>Payment Status</p>
                        {showPaymentStatusHandler()}
                    </div>
                </section>
                <section className='actions'>
                    <button type='submit' id='submit'>
                        Post Payment
                    </button>
                    <button name='sign' id='sign' type='button' onClick={signHandler}>
                        Sign
                    </button>
                    <button name='cancel' id='cancel' type='button' onClick={closeHandler}>
                        Cancel
                    </button>
                </section>
            </Component>
        </Dialog>
    );
};
const Component = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px 12px;
    grid-template-areas:
        "header header"
        "payments credits"
        "notes notes"
        "summary summary"
        "actions actions";
    header {
        grid-area: header;
        padding: 16px;
        background-color: ${colors.greyBackground};
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px 40px;
        grid-template-areas:
            "title title"
            "customer details";
        .title {
            grid-area: title;
            font-size: 16px;
            color: ${colors.black};
            font-weight: 800;
            text-transform: uppercase;
        }
        p {
            font-size: 14px;
        }
        section {
            .label {
                font-weight: 800;
                margin-bottom: 4px;
                display: flex;
                align-items: center;
                svg {
                    margin-right: 4px;
                }
            }
            p {
                margin-bottom: 4px;
                :last-of-type {
                    margin-bottom: 0;
                }
            }
        }
        section.customer {
            grid-area: customer;
        }
        section.order_details {
            grid-area: details;
            span {
                font-weight: 800;
            }
        }
    }
    section.form {
        padding: 16px;
        min-width: 280px;
        .section_label {
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            span {
                margin-left: 12px;
                font-weight: 800;
                font-size: 20px;
            }
        }
        .input_group {
            margin-bottom: 16px;
            :last-of-type {
                margin-bottom: 0;
            }
            .label {
                font-size: 14px;
                margin-bottom: 8px;
            }
            .input_wrapper {
                position: relative;
                ::before {
                    content: "$";
                    font-size: 14px;
                    position: absolute;
                    left: 8px;
                    top: 50%;
                    transform: translate(0, -50%);
                }
            }
            input,
            textarea {
                padding: 0 8px;
                padding-left: 18px;
                width: 100%;
                border: none;
                background-color: ${colors.greyBackground};
                height: 40px;
                font-size: 16px;
            }
            textarea {
                height: unset;
                padding: 8px;
            }
        }
    }
    section.payments {
        grid-area: payments;
    }
    section.credits {
        grid-area: credits;
    }
    section.notes {
        grid-area: notes;
    }
    section.summary {
        grid-area: summary;
        padding: 16px;
        p.section_label {
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 800;
            margin-bottom: 16px;
        }
        .stat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            border-bottom: 1px solid ${colors.greyLabel};
            padding-bottom: 4px;
            margin-bottom: 16px;
            :last-of-type {
                margin-bottom: 0;
            }
            p.label {
                text-transform: uppercase;
            }
            .value {
                font-size: 16px;
                font-weight: 800;
            }
            .pill {
                padding: 4px 9px;
                background-color: black;
                border-radius: 6px;
                color: white;
                text-transform: uppercase;
            }
        }
    }
    section.actions {
        grid-area: actions;
        padding: 16px;
        display: grid;
        grid-column-gap: 24px;
        grid-template-columns: repeat(3, auto);
        justify-content: flex-end;
        button {
            padding: 8px 24px;
            border: none;
            font-size: 14px;
            font-weight: 600;
            color: ${colors.white};
            border-radius: 4px;
            transition: all 150ms ease-in-out;
            :hover {
                transform: scale(1.05);
            }
            :active {
                transform: scale(0.95);
            }
        }
        #cancel {
            background-color: ${colors.red};
        }
        #submit {
            background-color: ${colors.black};
        }
        #sign {
            background-color: ${colors.purple};
        }
    }
`;
export default PostPayment;

// FIXME:
// the date from routes is still causing a SyncProblem
// when we create the new completed orders page we should pass the route date down to the orders
