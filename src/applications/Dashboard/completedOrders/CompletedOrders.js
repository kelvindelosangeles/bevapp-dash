import React, { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import { Application, ActionBar, Body } from "../../../components/layout/Application";
import Stat from "../../../components/action bar/Stat";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DatePicker from "../../../components/DatePicker";
import moment from "moment";
import { Order as OrderModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";
import DailyJournal from "../../../Global/PrintTemplates/DailyJournalPDF";
import Order from "../../../components/Order";

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

    useEffect(() => {
        theDate && getCompletedOrders();
    }, [theDate]);

    return (
        <Application>
            <ActionBar>
                <DatePicker theDate={theDate} setTheDate={setTheDate} label='Select a Date' />
                {orders && <Stat color={Colors.blue} title='Routes' data={orders.length} />}
                {orders && <Stat color={Colors.green} title='Total' data={`$${CalcTotalMultipleOrders(allOrders())}`} />}
                {orders && <Stat color={Colors.orange} title='Cases' data={CalcCasesMultipleOrders(allOrders())} />}
                <span />
                <span />
                {orders && (
                    <Button>
                        <PDFDownloadLink
                            document={
                                <DailyJournal
                                    orders={orders}
                                    total={CalcTotalMultipleOrders(allOrders())}
                                    totalCases={CalcCasesMultipleOrders(allOrders())}
                                    CalcCasesMultipleOrders={CalcCasesMultipleOrders}
                                    CalcTotalMultipleOrders={CalcTotalMultipleOrders}
                                    theDate={theDate}
                                />
                            }
                            fileName={`Daily Journal date`}>
                            {({ loading }) => (loading ? "Loading..." : "Download Daily Journal")}
                        </PDFDownloadLink>
                    </Button>
                )}
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
                                        return <Order order={b} completedDate={a.details.completedAt.toDate()} />;
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
            grid-template-columns: 160px 310px 1fr 1fr;
            grid-column-gap: 32px;
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
    }
`;
const HeaderComponent = styled.div`
    display: grid;
    /* grid-template-columns: repeat(4, 1fr); */
    grid-template-columns: 160px 310px 1fr 1fr;
    grid-column-gap: 32px;
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;
const Button = styled.button`
    padding: 14px 32px;
    background-color: ${Colors.blue};
    a {
        color: ${Colors.white}!important;
    }
    font-size: 16px;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
`;

export default CompletedOrders;
