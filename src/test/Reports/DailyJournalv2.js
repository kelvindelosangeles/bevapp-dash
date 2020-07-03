import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Colors } from "../../Constants/Colors";
import moment from "moment";
import { useFirestore } from "react-redux-firebase";
import { Order as OrderModel } from "../../Models/Order";
import Dialog from "@material-ui/core/Dialog";

const DailyJournalv2 = () => {
    const firestore = useFirestore();
    const [theDate, setTheDate] = useState("6/29/20");
    const [orders, setOrders] = useState(null);
    const [open, setOpen] = useState(false);
    const clickHandler = () => {
        const weekDocument = moment(theDate).format("YYYYMMwE");
        firestore
            .get({ collection: "ordersv2", doc: weekDocument })
            .then((res) => {
                console.log(res.data());
                res.data() && setOpen(true);
                res.data() ? setOrders(res.data()) : setOrders(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const BETAgeneratAllOrders = () => {
        let obj = {};
        Object.assign(
            obj,
            ...Object.values(orders).map((x) => {
                return x.orders;
            })
        );
        return Object.values(obj);
    };

    const CalculateDaysTotal = () => {
        try {
            return BETAgeneratAllOrders()
                .map((a) => {
                    return OrderModel.CalculateCart(a.cart, a.customer.specialPrices);
                })
                .reduce((a, b) => parseFloat(a) + parseFloat(b))
                .toFixed(2);
        } catch (error) {
            console.log(error);
            return "err";
        }
    };
    const CalculateDaysCases = () => {
        try {
            return BETAgeneratAllOrders()
                .map((a) => {
                    return OrderModel.CalculateCases(a.cart);
                })
                .reduce((a, b) => parseInt(a) + parseInt(b));
        } catch (error) {
            console.log(error);
            return "err";
        }
    };

    const calcRouteTotal = (orders) => {
        try {
            return Object.values(orders).length === 1
                ? OrderModel.CalculateCart(Object.values(orders)[0].cart, Object.values(orders)[0].customer.specialPrices)
                : Object.values(orders)
                      .map((a) => {
                          return OrderModel.CalculateCart(a.cart, a.customer.specialPrices);
                      })
                      .reduce((a, b) => parseFloat(a) + parseFloat(b))
                      .toFixed(2);
        } catch (error) {
            console.log(error);
            return "err";
        }
    };
    const calcRouteCases = (orders) => {
        try {
            return Object.values(orders).length === 1
                ? OrderModel.CalculateCases(Object.values(orders)[0].cart)
                : Object.values(orders)
                      .map((a) => {
                          return OrderModel.CalculateCases(a.cart);
                      })
                      .reduce((a, b) => parseInt(a) + parseInt(b));
        } catch (error) {
            console.log(error);
            return "err";
        }
    };

    return (
        <Component>
            <div className='header'>
                <p>Daily Journal</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type='text' value={theDate} onChange={(e) => setTheDate(e.target.value)} />
                </form>
                <button onClick={clickHandler}>Generate Journal</button>
                <p>{moment(theDate).format("LL")}</p>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} scroll='paper' fullScreen>
                <Results>
                    <div className='header'>
                        <p>Daily Journal</p>

                        <p>{moment(theDate).format("LL")}</p>
                    </div>
                    <div className='grid-header'>
                        <p>Driver</p>
                        <p>Orders</p>
                        <p>Cases</p>
                        <p>Total</p>
                    </div>
                    <div className='grid'>
                        {orders &&
                            Object.values(orders).map((i) => {
                                return (
                                    <div className='completeRoute'>
                                        <div className='route'>
                                            <p>{i.driver.firstName}</p>
                                            <p>{Object.values(i.orders).length}</p>
                                            <p>{calcRouteCases(i.orders)}</p>
                                            <p>${calcRouteTotal(i.orders)}</p>
                                        </div>
                                        <div className='order-grid'>
                                            {Object.values(i.orders).map((s) => {
                                                return (
                                                    <div className='order'>
                                                        <p>{s.customer.address}</p>
                                                        <p></p>
                                                        <p>{OrderModel.CalculateCases(s.cart)}</p>
                                                        <p>${OrderModel.CalculateCart(s.cart, s.customer.specialPrices)}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className='footer'>
                        <p>Days Total : ${CalculateDaysTotal()}</p>
                        <p>Days TotalCases : {CalculateDaysCases()}</p>
                    </div>
                </Results>
            </Dialog>
        </Component>
    );
};
const Component = styled.div`
    background-color: white;
    padding: 32px;
    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
        align-items: center;
        button {
            background-color: black;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
        }
        form {
            input {
                background-color: ${Colors.lightGrey};
                padding: 8px;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                border: none;
            }
        }
    }
`;

const Results = styled.div`
    padding: 32px;
    background-color: white;
    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
        align-items: center;
        font-weight: 600;
        font-size: 18px;
        button {
            background-color: black;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
        }
        form {
            input {
                background-color: ${Colors.lightGrey};
                padding: 8px;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                border: none;
            }
        }
    }
    .grid-header {
        font-weight: 600;
        margin-bottom: 24px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 12px;
    }
    .grid {
        display: grid;
        grid-row-gap: 48px;
        .route {
            display: grid;
            grid-template-columns: repeat(4, 25%);
            padding: 12px;
            background-color: ${Colors.navy};
            color: ${Colors.white};
        }
        .order-grid {
            .order {
                display: grid;
                grid-template-columns: repeat(4, 25%);
                padding: 12px;
                background-color: ${Colors.lightGrey};
            }
        }
    }
    .footer {
        margin-top: 40px;
        display: grid;
        grid-row-gap: 16px;
        font-weight: 600;
        font-size: 18px;
    }
`;
export default DailyJournalv2;

// This was a function used to move a doc over to a new doc name

// useEffect(() => {
//     firestore
//         .get({ collection: "ordersv2", doc: "202007272" })
//         .then((res) => {
//             console.log(res.exists);
//             console.log(res.data());
//             firestore.set({ collection: "ordersv2", doc: "202006272" }, res.data());
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }, []);
