import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import Application from "../../../components/app layout/Application";
import ActionBar from "../../../components/app layout/ActionBar";
import Body from "../../../components/app layout/Body";
import DatePicker from "../../../components/DatePicker";
import moment from "moment";
import { useEffect } from "react";
import { Colors } from "../../../Constants/Colors";
import { Order as OrderModel } from "../../../Models/Order";
import Stat from "../../../components/action bar/Stat";

import OrderPreview from "../../../components/OrderPreview";

const CompletedOrders = () => {
    const [theDate, setTheDate] = useState(null);
    const [orders, setOrders] = useState(null);
    const firestore = useFirestore();
    const allOrders = () => {
        let obj = {};
        orders.forEach((y) => {
            Object.assign(obj, y.orders);
        });
        return obj;
    };
    const getCompletedOrders = () => {
        const weekDocument = moment(theDate).format("YYYYMMwE");
        firestore
            .get({ collection: "ordersv2", doc: weekDocument })
            .then((res) => {
                console.log(res.data());
                // retrieve the day with all the routes, convert to array and set to state
                res.data() ? setOrders(Object.values(res.data())) : setOrders(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const CalcCasesMultipleOrders = (orders) => {
        // TODO:101 Move to ORDER MODELS
        return Object.values(orders)
            .map((x) => {
                return OrderModel.CalculateCases(x.cart);
            })
            .reduce((a, b) => a + b);
    };
    const CalcTotalMultipleOrders = (orders) => {
        // TODO:101 Move to ORDER MODELS
        try {
            return Object.values(orders).length === 1
                ? OrderModel.CalculateCart(Object.values(orders)[0].cart, Object.values(orders)[0].customer.specialPrices)
                : Object.values(orders)
                      .map((x) => {
                          return OrderModel.CalculateCart(x.cart, x.customer.specialPrices);
                      })
                      .reduce((a, b) => parseFloat(a) + parseFloat(b))
                      .toFixed(2);
        } catch (error) {
            console.log(error);
            return "ERR";
        }
    };
    const GenerateDailyJournal = () => {
        window.alert("Coming Soon");
    };

    useEffect(() => {
        theDate && getCompletedOrders();
    }, [theDate]);

    return (
        <Application>
            <ActionBar>
                <DatePicker theDate={theDate} setTheDate={setTheDate} label='Select a Date' />
                {orders && <Stat color={Colors.green} title='Routes' data={orders.length} />}
                {orders && <Stat color={Colors.blue} title='Cases' data={CalcCasesMultipleOrders(allOrders())} />}
                {orders && <Stat color={Colors.orange} title='Total' data={`$${CalcTotalMultipleOrders(allOrders())}`} />}
                <span />
                <span />
                {orders && <Button onClick={GenerateDailyJournal}>Download Daily Journal</Button>}{" "}
            </ActionBar>
            <Body title='Completed Orders' header={<Header />}>
                {orders ? (
                    <BodyContent>
                        {orders.map((a) => {
                            return (
                                <div className='route'>
                                    <div className='route-details'>
                                        <p>{a.driver.firstName}</p>
                                        <p>{Object.values(a.orders).length}</p>
                                        <p>{CalcCasesMultipleOrders(a.orders)}</p>
                                        <p>${CalcTotalMultipleOrders(a.orders)}</p>
                                    </div>
                                    {Object.values(a.orders).map((b) => {
                                        {
                                            /* return (
                                            <div className='route-order'>
                                                <p>{b.customer.address}</p>
                                                <span />
                                                <p>{OrderModel.CalculateCases(b.cart)}</p>
                                                <p>${OrderModel.CalculateCart(b.cart, b.customer.specialPrices)}</p>
                                            </div>
                                        ); */
                                        }
                                        return <OrderPreview order={b} />;
                                    })}
                                </div>
                            );
                        })}
                    </BodyContent>
                ) : (
                    <h4>No Orders Found</h4>
                )}
            </Body>
        </Application>
    );
};

const Header = () => {
    return (
        <HeaderComponent>
            <p>Driver</p>
            <p>Orders</p>
            <p>Cases</p>
            <p>Total</p>
        </HeaderComponent>
    );
};

const BodyContent = styled.div`
    display: grid;
    grid-row-gap: 48px;
    .route {
        .route-details {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            padding: 16px;
            margin-left: -16px;
            margin-right: -16px;
            background-color: ${Colors.navy};
            color: ${Colors.white};
            font-size: 16px;
            font-weight: 500;
            border-radius: 4px 4px 0 0;
            text-transform: uppercase;
        }
        .route-order {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            padding: 16px;
            margin-left: -16px;
            margin-right: -16px;
            background-color: ${Colors.lightGrey};
            color: ${Colors.black};
            border-radius: 0;
            text-transform: uppercase;
            :nth-last-of-type(even) {
                background-color: ${Colors.white};
            }
        }
    }
`;
const HeaderComponent = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;
const Button = styled.button`
    padding: 14px 32px;
    background-color: ${Colors.blue};
    color: ${Colors.white};
    font-size: 16px;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
`;

export default CompletedOrders;
