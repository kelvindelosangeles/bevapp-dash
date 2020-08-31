import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import firebase from "firebase";
import moment from "moment";
import { Colors } from "../Constants/Colors";
import Application, { ActionBar, Body } from "../components/layout/Application";
import DatePicker from "../components/DatePicker";
import Stat from "../components/action bar/Stat";
import NonOrderReportPDF from "../Global/PrintTemplates/NonOrderReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Order as OrderModel } from "../Models/Order";
import { useSelector } from "react-redux";

const NOR = () => {
    const [orders, setOrders] = useState(null);
    // BETA
    const [filterInactiveCustomers, setFilterInactiveCustomers] = useState(true);
    const [theDate, setTheDate] = useState(`${moment().format("MM")}/01/${moment().format("YYYY")}`);
    const allCustomers = useSelector((state) => state.Firestore.data.store.customers);

    const getOrders = async () => {
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
                .flat()
                .map((b) => {
                    return Object.values(b.orders);
                })
                .flat();

            setOrders(data);
        } catch (error) {
            console.log(error);
            window.alert("An error has occured");
        }
    };

    const getNonOrderCustomers = () => {
        try {
            const customersWithOrders = [
                ...new Set(
                    orders
                        .filter((a) => {
                            return moment(a.details.createdAt).isSameOrAfter(theDate);
                        })
                        .map((b) => {
                            return b.customer.id;
                        })
                ),
            ];
            const customerWithoutOrders = Object.values(allCustomers).filter((x) => {
                return customersWithOrders.indexOf(x.id) === -1;
            });
            // console.log("allCustomers", Object.values(allCustomers));
            // console.log("customersWithOrders", customersWithOrders);
            console.log("customerWithoutOrders", customerWithoutOrders);
            // console.log("orders", orders);

            return customerWithoutOrders;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const getLastOrderDate = (id) => {
        try {
            const customerOrders = orders
                .sort((a, b) => {
                    return moment(a.details.createdAt).valueOf() > moment(b.details.createdAt).valueOf() ? 1 : -1;
                })
                .filter((a) => {
                    return a.customer.id === id;
                });

            if (customerOrders.length === 0) {
                return "";
            }

            return moment(customerOrders[customerOrders.length - 1].details.createdAt).format("L");
        } catch (error) {
            console.log(error);
            return "";
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Application>
            <ActionBar>
                <ActionWrapper>
                    <DatePicker theDate={theDate} setTheDate={setTheDate} label='Select a Date' />
                    <Stat color={Colors.blue} title='Customers' data={getNonOrderCustomers().length || 0} />
                    <Button color={Colors.orange} onClick={() => setFilterInactiveCustomers(!filterInactiveCustomers)}>
                        Hide Inactive Customers
                    </Button>
                    {orders && (
                        <Button color={Colors.blue}>
                            <PDFDownloadLink
                                document={
                                    <NonOrderReportPDF
                                        orders={orders}
                                        theDate={theDate}
                                        allCustomers={allCustomers}
                                        customers={getNonOrderCustomers()}
                                    />
                                }
                                fileName={`Non Order Report ${moment().format("L")}`}>
                                {({ loading }) => (loading ? "Loading..." : "Download Report")}
                            </PDFDownloadLink>
                        </Button>
                    )}
                </ActionWrapper>
            </ActionBar>
            <Body title='Non Order Report' header={<Header />}>
                <CustomerWrapper>
                    {orders &&
                        getNonOrderCustomers()
                            .sort((a, b) => {
                                return a.address > b.address ? 1 : -1;
                            })
                            .filter((z) => {
                                return z.address !== "123 Test blvd";
                            })
                            .filter((f) => {
                                {
                                    /* This filter checks if the customer has any previous orders and removes them if the toggle is on */
                                }
                                return filterInactiveCustomers ? getLastOrderDate(f.id) !== "" : f;
                            })
                            .map((c) => {
                                return (
                                    <div className='customer'>
                                        <p className='address'>{c.address}</p>
                                        <p>{c.telephone}</p>
                                        <p className='date'>{getLastOrderDate(c.id)}</p>
                                    </div>
                                );
                            })}
                </CustomerWrapper>
            </Body>
        </Application>
    );
};

const Header = () => {
    return (
        <HeaderComponent>
            <p>Customer</p>
            <p>Telephone</p>
            <p>Last Order Date</p>
            <p></p>
        </HeaderComponent>
    );
};

const HeaderComponent = styled.div`
    display: grid;
    grid-template-columns: 300px 150px 1fr 1fr;
    grid-column-gap: 32px;
    padding: 0 16px;
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;
const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: min-content 250px 1fr 1fr;
    grid-column-gap: 32px;
    align-items: center;
`;
const Button = styled.button`
    padding: 14px 32px;
    background-color: ${({ color }) => color};
    justify-self: flex-end;
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
const CustomerWrapper = styled.div`
    display: grid;

    .customer:nth-child(even) {
        background-color: ${Colors.lightGrey};
    }
    .customer {
        padding: 12px 16px;
        display: grid;
        grid-template-columns: 300px 150px 1fr 1fr;
        grid-column-gap: 32px;
        p {
            font-size: 16px;
            font-weight: 500;
            color: ${Colors.greyText};
        }
        .address {
            text-transform: uppercase;
        }
    }
`;

export default NOR;
