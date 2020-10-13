import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import moment from "moment-timezone";
import { Colors } from "../../Constants/Colors";
import DatePicker from "../../components/DatePickerv2";
import { Application, ActionBar, Body } from "../../components/layout/Application";
import { Drivers } from "../../Assets/Data/Drivers";
import { Order as OrderModel } from "../../Models/Order";

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

const WeeklyJournal = () => {
    const [routes, setroutes] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const getRoutes = async () => {
        try {
            const response = await firebase.firestore().collection("ordersv2").get();
            const data = await response.docs
                .filter((f) => {
                    // fitlers out orders coming from orders
                    return f.id != "orders";
                })
                .map((a) => {
                    return Object.values(a.data());
                })
                .flat();

            setroutes(data);
        } catch (error) {
            console.log(error);
            window.alert("An error has occured");
        }
    };
    const reset = () => {
        setroutes(null);
        setFromDate(null);
        setToDate(null);
    };
    const BETACalcTotalMultipleOrders = (ordersArr) => {
        try {
            return ordersArr.length === 1
                ? OrderModel.CalculateCart(ordersArr[0].cart, ordersArr[0].customer.specialPrices)
                : Object.values(ordersArr)
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
    const BETACalcCasesMultipleOrders = (ordersArr) => {
        // TODO:101 Move to ORDER MODELS
        try {
            return ordersArr
                .map((x) => {
                    return OrderModel.CalculateCases(x.cart);
                })
                .reduce((a, b) => a + b);
        } catch (error) {
            console.log(error);
            return "ERR";
        }
    };

    const report = () => {
        return Drivers.map((a) => {
            const reportOrders = routes
                .filter((x) => {
                    //  Emergency return only orders that have the dates object
                    return x.details.dates && x;
                })
                .filter((b) => {
                    // TODO:: Taking away one day  because the formula doesnt count the first day
                    return moment(b.details.dates.routeDate.date).isBetween(moment(fromDate).subtract(1, "day"), toDate, null, "[]");
                })
                .filter((c) => {
                    return c.driver.lastName === a.lastName;
                })
                .map((d) => {
                    return Object.values(d.orders);
                })
                .flat();

            // console.log(a.firstName, a.ID, reportOrders);

            return (
                <ReportEntry>
                    <p>{a.firstName}</p>
                    <p>{reportOrders.length}</p>
                    <p>{BETACalcCasesMultipleOrders(reportOrders)}</p>
                    <p>${BETACalcTotalMultipleOrders(reportOrders)}</p>
                </ReportEntry>
            );
        });
    };

    const footer = () => {
        const routesArr =
            routes &&
            routes
                .filter((x) => {
                    //  Emergency return only orders that have the dates object
                    return x.details.dates && x;
                })
                .filter((b) => {
                    // TODO:: Taking away one day  because the formula doesnt count the first day
                    return moment(b.details.dates.routeDate.date).isBetween(moment(fromDate).subtract(1, "day"), toDate, null, "[]");
                })
                .map((x) => {
                    return Object.values(x.orders);
                })
                .flat();

        try {
            return (
                routes && (
                    <ReportSummary>
                        <p className='head'>Report Summary</p>
                        <p>
                            Total Orders: <span>{routesArr.length}</span>
                        </p>
                        <p>
                            Total Cases: <span>{BETACalcCasesMultipleOrders(routesArr)}</span>
                        </p>
                        <p>
                            Total Cost: <span>${BETACalcTotalMultipleOrders(routesArr)}</span>
                        </p>
                    </ReportSummary>
                )
            );
        } catch (error) {}
    };

    return (
        <Application>
            <ActionBar>
                <ActionWrapper>
                    <DatePicker theDate={fromDate} onChange={setFromDate} label='Select a start Date' />
                    {fromDate && (
                        <DatePicker theDate={toDate} onChange={setToDate} label='Select an end Date' minDate={moment(fromDate).add(1, "day")} />
                    )}
                    {toDate && (
                        <button onClick={getRoutes} disabled={routes ? true : false}>
                            Generate Report
                        </button>
                    )}
                    {routes && (
                        <button id='reset' onClick={reset}>
                            Reset
                        </button>
                    )}
                </ActionWrapper>
            </ActionBar>
            <Body title={"Weekly Journal"} header={<Header />}>
                {routes ? (
                    report()
                ) : (
                    <LoadingMessage>Please Select a start and end date, then press generate Report to view the results</LoadingMessage>
                )}

                {routes && footer()}
            </Body>
        </Application>
    );
};
const Component = styled.div``;

const HeaderComponent = styled.div`
    display: grid;
    grid-template-columns: 160px 310px 1fr 1fr;
    grid-column-gap: 32px;
    padding: 0 16px;
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;

const LoadingMessage = styled.div`
    font-size: 24px;
    text-align: center;
    font-weight: 600;
    max-width: 600px;
    margin: 0 auto;
`;

const ReportEntry = styled.div`
    display: grid;
    grid-template-columns: 160px 310px 1fr 1fr;
    grid-column-gap: 32px;
    color: ${Colors.black};
    font-size: 16px;
    font-weight: 600;
    padding: 16px;
    border-bottom: 1px solid ${Colors.black};
    text-transform: uppercase;
    :nth-child(even) {
        background-color: ${Colors.lightGrey};
    }
`;

const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: min-content 1fr min-content min-content;
    grid-column-gap: 40px;
    button {
        padding: 14px 32px;
        background-color: #1561de;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        border: none;
        border-radius: 4px;
        white-space: nowrap;
        color: white;
        :disabled {
            background-color: ${Colors.grey};
        }
    }
    #reset {
        background-color: ${Colors.yellow};
        color: ${Colors.black};
    }
`;

const ReportSummary = styled.div`
    margin-top: 80px;
    .head {
        font-size: 20px;
        font-weight: 600;
    }
    p {
        font-size: 16px;
        span {
            font-weight: 700;
        }
    }
`;
export default WeeklyJournal;
