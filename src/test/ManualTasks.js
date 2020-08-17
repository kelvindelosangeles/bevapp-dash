import React from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useFirestore } from "react-redux-firebase";
import Application, { ActionBar, Body } from "../components/layout/Application";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import { Colors } from "../Constants/Colors";
import DatePicker from "../components/DatePicker";
import CustomerSelect from "../Global/CustomerSelect/CustomerSelect";
import Stat from "../components/action bar/Stat";

const ManualTasks = () => {
    const [orders, setOrders] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [theDate, setTheDate] = useState(null);

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

    const data =
        orders &&
        orders
            .filter((a) => {
                return moment(a.details.createdAt).isSameOrAfter(theDate);
            })
            .filter((b) => {
                return customer ? b.customer.id === customer.id : b;
            });

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Application>
            <ActionBar>
                {orders && (
                    <TempActionWrapper>
                        {orders && <Stat color={Colors.blue} title='Routes' data={orders.length} />}
                        {orders && <Stat color={Colors.blue} title='Routes' data={orders.length} />}

                        <DatePicker theDate={theDate} setTheDate={setTheDate} label='Select a Date' />
                        <CustomerSelect customerChangeHandler={customerChangeHandler} selectedCustomer={customer} />
                    </TempActionWrapper>
                )}
            </ActionBar>
            <Body title='Customer Purchase Sheet' header={<Header />}>
                {theDate &&
                    data.map((c) => {
                        return (
                            <div>
                                <p>{c.customer.address}</p>
                                <p>{c.details.createdAt}</p>
                            </div>
                        );
                    })}
            </Body>
        </Application>
    );
};

const Header = () => {
    return (
        <HeaderComponent>
            <p>Order #</p>
            <p>Date</p>
            <p>Cases</p>
            <p>Total</p>
        </HeaderComponent>
    );
};
const Component = styled.div``;
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
const TempActionWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr 1fr;
    grid-column-gap: 48px;
    width: 1000px;
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
export default ManualTasks;
