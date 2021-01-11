import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Colors } from "../Constants/Colors";
const Test = () => {
    const [paymentOpen, setPaymentOpen] = useState(true);
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

    const submitPaymentHandler = (data) => {
        console.log(data);
    };

    const totalCredits = (
        parseFloat(watch("priceAdjustment")) +
        parseFloat(watch("breakage")) +
        parseFloat(watch("returnedContainers")) +
        parseFloat(watch("returnedToFlair"))
    ).toFixed(2);
    const totalPayment = (parseFloat(watch("cash")) + parseFloat(watch("check"))).toFixed(2);

    return (
        <Component>
            <p>The Test Page</p>
            <Dialog open={paymentOpen} fullWidth scroll='paper'>
                <PaymentForm onSubmit={handleSubmit(submitPaymentHandler)}>
                    <DialogTitle>
                        <p style={{ textAlign: "center" }}>Add Payment Details</p>
                        <div className='payment-breakdown'>
                            <div className='stat'>
                                <Typography variant='overline'>Order Total</Typography>
                                <Typography variant='caption'>number</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='overline'>Credits </Typography>
                                <Typography variant='caption'>$ {totalCredits}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='overline'> Payment</Typography>
                                <Typography variant='caption'>$ {totalPayment}</Typography>
                            </div>
                            <div className='stat'>
                                <Typography variant='overline'>Total Credits</Typography>
                                <Typography variant='caption'>number</Typography>
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
                        <Button size='large' type='button' variant='contained' color='secondary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </PaymentForm>
            </Dialog>
        </Component>
    );
};
const Component = styled.div`
    background-color: white;
    padding: 24px;
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

export default Test;
