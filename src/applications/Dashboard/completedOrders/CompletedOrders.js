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

// BETA
import ReactExport from "react-export-excel";
import ResponsiveBlock from "../../../componentsv3/responsive block";
import PaymentSummary from "../../../Global/PrintTemplates/PaymentSummary";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excel = ({ routes }) => {
    const sheets = routes.map((a) => {
        return (
            <ExcelSheet data={Object.values(a[1].orders)} name={a[1].driver.firstName}>
                <ExcelColumn
                    label='Order ID'
                    value={(col) => {
                        return col.details.orderID;
                    }}
                />
                <ExcelColumn
                    label='Address'
                    value={(col) => {
                        return col.customer.address;
                    }}
                />
                <ExcelColumn
                    label='Amount'
                    value={(col) => {
                        return Number(OrderModel.CalculateCart(col.cart, col.customer.specialPrices)).toFixed(2);
                    }}
                />
                <ExcelColumn label='Credit' value='' />
                <ExcelColumn label='Cash' value='' />
                <ExcelColumn label='Checks' value='' />
                <ExcelColumn label='Sign' value='' />
                <ExcelColumn label='Total' value='' />
                <ExcelColumn label='' value='' />
                <ExcelColumn label='' value='' />
                <ExcelColumn label='Credits' value='' />
                <ExcelColumn label='Shorts stop#' value='' />
                <ExcelColumn label='Overs' value='' />
            </ExcelSheet>
        );
    });
    return (
        <ExcelFile
            filename={moment(routes[0][1].details.completedAt.toDate()).format("L")}
            element={<Button color={Colors.yellow}>Excel File</Button>}>
            {sheets}
        </ExcelFile>
    );
};

const CompletedOrders = () => {
    const [theDate, setTheDate] = useState(null);
    const [orders, setOrders] = useState(null);
    const [rawOrder, setRawOrder] = useState(null);
    const [routes, setRoutes] = useState(null);

    const firestore = useFirestore();
    // routes && console.log(routes);
    const allOrders = () => {
        let obj = {};
        orders.forEach((y) => {
            Object.assign(obj, y.orders);
        });
        return obj;
    };
    const weekDocument = moment(theDate).format("YYYYMMwE");
    const getCompletedOrders = () => {
        firestore
            .get({ collection: "ordersv2", doc: weekDocument })
            .then((res) => {
                // retrieve the day with all the routes, convert to array and set to state

                res.data() ? setOrders(Object.values(res.data())) : setOrders(null);
                res.data() ? setRawOrder(res.data()) : setRawOrder(null);

                // collect the routes from this day and save it to state

                res.data() ? setRoutes(Object.entries(res.data())) : setRoutes(null);
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
        <>
            <ResponsiveBlock />
            <Application>
                <ActionBar>
                    <ActionWrapper>
                        <DatePicker theDate={theDate} setTheDate={setTheDate} label='Select a Date' />
                        {orders && <Stat color={Colors.blue} title='Routes' data={orders.length} />}
                        {orders && <Stat color={Colors.green} title='Total' data={`$${CalcTotalMultipleOrders(allOrders())}`} />}
                        {orders && <Stat color={Colors.orange} title='Cases' data={CalcCasesMultipleOrders(allOrders())} />}
                        <span />
                        <span />
                        {routes && <Excel routes={routes} />}
                        {orders && (
                            <Button color={Colors.blue}>
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
                    </ActionWrapper>
                </ActionBar>
                <Body title='Completed Orders' header={<Header />}>
                    {orders ? (
                        <BodyContent>
                            {orders.map((a) => {
                                console.log();
                                return (
                                    <div className='route'>
                                        <div className='route-details'>
                                            <p>{a.driver.firstName}</p>
                                            <p>{Object.values(a.orders).length}</p>
                                            <p>{CalcCasesMultipleOrders(a.orders)}</p>
                                            <p>${CalcTotalMultipleOrders(a.orders)}</p>
                                            <PDFDownloadLink
                                                document={<PaymentSummary route={a} orderTotal={CalcTotalMultipleOrders(a.orders)} />}
                                                fileName={`${a.driver.firstName} ${
                                                    a.details.dates && moment(a.details.dates.routeDate.date).format("L")
                                                }.pdf`}>
                                                {({ loading }) => (loading ? "Loading" : <Button>Summary</Button>)}
                                            </PDFDownloadLink>
                                        </div>
                                        {Object.values(a.orders).map((b) => {
                                            return (
                                                <Order
                                                    order={b}
                                                    completedDate={a.details.completedAt.toDate()}
                                                    canAddPayment
                                                    parentRoute={a}
                                                    weekDocument={rawOrder}
                                                    weekDocumentID={weekDocument}
                                                    // TODO:: Beta -  passing this down to refresh the app each time a new payment is added
                                                    getCompletedOrders={getCompletedOrders}
                                                />
                                            );
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
        </>
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

const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-content: space-between;
    grid-column-gap: 24px;
    align-items: center;
`;
const BodyContent = styled.div`
    display: grid;
    grid-row-gap: 48px;
    .route {
        .route-details {
            display: grid;
            grid-template-columns: 160px 310px 1fr 1fr 1fr;
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
            align-items: center;
            button {
                padding: 8px 24px;
            }
        }
    }
`;
const HeaderComponent = styled.div`
    display: grid;

    grid-template-columns: 160px 310px 1fr 1fr 1fr;
    grid-column-gap: 32px;
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;
const Button = styled.button`
    padding: 14px 32px;
    background-color: ${({ color }) => color};
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
