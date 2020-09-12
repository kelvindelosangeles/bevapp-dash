import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import firebase from "firebase";
import moment from "moment";
import { Colors } from "../../Constants/Colors";
import Application, { ActionBar, Body } from "../../components/layout/Application";
import CustomerSelect from "../../Global/CustomerSelect/CustomerSelect";
import DatePicker from "../../components/DatePicker";
import Stat from "../../components/action bar/Stat";
import Order from "../../components/Order";
import CustomerPurchaseSheetPDF from "../../Global/PrintTemplates/CustomerPurchaseSheetPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Order as OrderModel } from "../../Models/Order";
import { useSelector } from "react-redux";

const CustomerPurchaseSheet = () => {
    const [orders, setOrders] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [theDate, setTheDate] = useState(`${moment().format("MM")}/01/${moment().format("YYYY")}`);

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
    const customerChangeHandler = (e, value) => {
        setCustomer(value);
    };

    const filteredOrders =
        orders &&
        orders
            .sort((a, b) => {
                return moment(a.details.createdAt).valueOf() > moment(b.details.createdAt).valueOf() ? 1 : -1;
            })
            .filter((a) => {
                return moment(a.details.createdAt).isSameOrAfter(theDate);
            })
            .filter((b) => {
                return customer ? b.customer.id === customer.id : b;
            });

    const CalcTotalMultipleOrders = () => {
        // TODO:101 Move to ORDER MODELS
        try {
            return Object.values(filteredOrders).length === 1
                ? OrderModel.CalculateCart(Object.values(orders)[0].cart, Object.values(filteredOrders)[0].customer.specialPrices)
                : Object.values(filteredOrders)
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

    const CalcCasesMultipleOrders = () => {
        // TODO:101 Move to ORDER MODELS
        try {
            return Object.values(filteredOrders)
                .map((x) => {
                    return OrderModel.CalculateCases(x.cart);
                })
                .reduce((a, b) => a + b);
        } catch (error) {
            console.log(error);
            return "ERR";
        }
    };
    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Application>
            <ActionBar>
                {orders && (
                    <ActionWrapper>
                        <DatePicker theDate={theDate} setTheDate={setTheDate} label='Select a Date' />
                        <CustomerSelect customerChangeHandler={customerChangeHandler} selectedCustomer={customer} />
                        {orders && customer && <Stat color={Colors.blue} title='Orders' data={filteredOrders.length} />}
                        {orders && customer && <Stat color={Colors.green} title='Total Cost' data={"$" + CalcTotalMultipleOrders()} />}
                        {orders && customer && <Stat color={Colors.orange} title='Cases' data={CalcCasesMultipleOrders()} />}
                        {filteredOrders.length > 0 && customer && (
                            <Button color={Colors.blue}>
                                <PDFDownloadLink
                                    document={
                                        <CustomerPurchaseSheetPDF
                                            orders={filteredOrders}
                                            theDate={theDate}
                                            customer={customer}
                                            totalCases={CalcCasesMultipleOrders()}
                                            totalCost={CalcTotalMultipleOrders()}
                                        />
                                    }
                                    fileName={`Customer Purchase Sheet: ${customer.address}`}>
                                    {({ loading }) => (loading ? "Loading..." : "Download Report")}
                                </PDFDownloadLink>
                            </Button>
                        )}
                    </ActionWrapper>
                )}
            </ActionBar>
            <Body title='Customer Purchase Sheet' header={<Header />}>
                {theDate &&
                    customer &&
                    filteredOrders.map((c) => {
                        return <Order order={c} completedDate={c.details.completedAt} generateInvoice={false} />;
                    })}
            </Body>
        </Application>
    );
};

const Header = () => {
    return (
        <HeaderComponent>
            <p>Order #</p>
            <p>Customer</p>
            <p>Cases</p>
            <p>Total</p>
        </HeaderComponent>
    );
};

const HeaderComponent = styled.div`
    display: grid;
    grid-template-columns: 160px 310px 1fr 1fr;
    grid-column-gap: 32px;
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;
const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: min-content 250px auto auto auto auto;
    grid-column-gap: 32px;
    align-items: center;
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
export default CustomerPurchaseSheet;
