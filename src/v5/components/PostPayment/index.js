import { Dialog } from "@material-ui/core";
import { SyncProblem } from "@material-ui/icons";
import moment from "moment-timezone";
import { Receipt, Storefront } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import colors from "../../constants/Colors";
import { closePaymentForm, submitPayment } from "../../redux/actions/paymentFormActions/index";
import { formatPhoneNumber } from "../../utilities/methods";

const PostPayment = () => {
    const open = useSelector((state) => state.PaymentForm.open);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, watch } = useForm();
    const { customer, details, payment, cart } = useSelector((state) => state.PaymentForm.order);
    const route = useSelector((state) => state.PaymentForm.route);

    const submitHandler = (data) => {
        dispatch(submitPayment(data));
    };
    const closeHandler = () => {
        dispatch(closePaymentForm());
    };

    useEffect(() => {
        console.log("This is coming from the post payment modal");
    }, []);

    return (
        <Dialog open={open} scroll='paper' onClose={closeHandler}>
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
                        {/* <p>{moment(route?.dates?.routeDate.date || route?.completedAt?.toDate()).format("LL")}</p> */}
                        <p>(718) 832-2392</p>
                    </section>
                </header>
                <section className='payments form'>
                    <p className='section_label'>Payments</p>
                    <div className='input_group'>
                        <p className='label'>Cash</p>
                        <div className='input_wrapper'>
                            <input type='number' name='cash' ref={register()} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Check</p>
                        <div className='input_wrapper'>
                            <input type='number' name='check' ref={register()} />
                        </div>
                    </div>
                </section>
                <section className='credits form'>
                    <p className='section_label'>Credits</p>
                    <div className='input_group'>
                        <p className='label'>Breakage</p>
                        <div className='input_wrapper'>
                            <input type='number' name='breakage' ref={register()} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Price Adjustment</p>
                        <div className='input_wrapper'>
                            <input type='number' name='priceAdjustment' ref={register()} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Returned Cans/Bottles</p>
                        <div className='input_wrapper'>
                            <input type='number' name='returnedContainers' ref={register()} />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p className='label'>Merchandise Returned to Flair</p>
                        <div className='input_wrapper'>
                            <input type='number' name='cash' ref={register()} />
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
                        <p className='value'>$34.99</p>
                    </div>
                    <div className='stat'>
                        <p className='label'>Payment Total</p>
                        <p className='value'>$34.99</p>
                    </div>
                    <div className='stat'>
                        <p className='label'>Payment Status</p>
                        <div className='pill'>
                            <p>Paid</p>
                        </div>
                    </div>
                </section>
                <section className='actions'>
                    <button type='submit' id='submit'>
                        Post Payment
                    </button>
                    <button name='sign' id='sign'>
                        Sign
                    </button>
                    <button name='cancel' id='cancel'>
                        Cancel
                    </button>
                </section>
            </Component>
            )
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
        }
    }
    section.form {
        padding: 16px;
        min-width: 280px;
        .section_label {
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 16px;
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
            input,
            textarea {
                padding: 0 8px;
                width: 100%;
                border: none;
                background-color: ${colors.greyBackground};
                height: 40px;
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
