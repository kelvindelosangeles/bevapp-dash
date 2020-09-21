import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import firebase from "firebase";
import moment from "moment-timezone";
import Application, { ActionBar, Body } from "../../components/layout/Application";
import DatePicker from "../../components/DatePickerv2";
import Stat from "../../components/action bar/Stat";
import { Colors } from "../../Constants/Colors";
import SmartSelect from "../../components/SmartSelect";

const BeverageReport = () => {
    const [orders, setOrders] = useState(null);
    const [beverage, setBeverage] = useState(null);
    const [theDate, setTheDate] = useState(`${moment().format("MM")}/01/${moment().format("YYYY")}`);
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);
    const beverageChangeHandler = (e, value) => {
        setBeverage(value);
    };
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

            setOrders(Object.values(data));
        } catch (error) {
            console.log(error);
            window.alert("An error has occured");
        }
    };
    const calcCasesOfType = (order, beverage) => {
        try {
            return order.cart[beverage.id].qty;
        } catch (error) {
            console.log(error);
            return "err";
        }
    };
    const calcCasesOfTypeCost = (order, beverage) => {
        const beverageID = beverage.id;
        try {
            const qty = order.cart[beverageID].qty;
            return (parseFloat(order.customer.specialPrices[beverageID].price) * parseInt(qty)).toFixed(2);
        } catch (error) {
            const qty = order.cart[beverageID].qty;
            // console.log(qty, order.cart[beverageID].price);
            return (parseFloat(order.cart[beverageID].price) * parseInt(qty)).toFixed(2);
        }
    };
    const calcCasesOfTypeTotal = (list, beverage) => {
        list.map((x) => {
            return x.cart[beverage.id].qty;
        }).reduce((y, z) => {
            return parseInt(y) + parseInt(z);
        });
    };
    const showPrice = (order, beverage) => {
        const beverageID = beverage.id;
        try {
            return order.customer.specialPrices[beverageID].price;
        } catch (error) {
            // console.log(qty, order.cart[beverageID].price);
            return order.cart[beverageID].price;
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const beverageReport =
        beverage &&
        orders &&
        orders
            .filter((a) => {
                // Date Filter
                return moment(a.details.createdAt).isSameOrAfter(theDate);
            })
            .filter((b) => {
                // beverage filter
                // if a beverage is selected filter by that otherwise null and disable filter
                return beverage ? b.cart.hasOwnProperty(beverage.id) : b;
            })
            .map((c) => {
                return (
                    <div className='report'>
                        <div className='report-header'>
                            <p>{c.customer.address}</p>
                            {/* <p>{calcCasesOfTypeTotal(Object.values(c), beverage)}</p> */}
                            <p>43</p>
                            <p></p>
                            <p>$4539.00</p>
                        </div>
                        {Object.values(orders)
                            .filter((d) => {
                                return d.customer.id === c.customer.id;
                            })
                            .map((e) => {
                                return (
                                    <div className='order'>
                                        <div>
                                            <p>{e.details.orderID}</p>
                                            <p className='date'>{moment(e.details.createdAt).format("LL")}</p>
                                        </div>
                                        <p>{calcCasesOfType(e, beverage)}</p>
                                        <p>{showPrice(e, beverage)}</p>
                                        <p></p>
                                        <p>${calcCasesOfTypeCost(e, beverage)}</p>
                                    </div>
                                );
                            })}
                    </div>
                );
            });

    return (
        <Application>
            <ActionBar>
                <ActionWrapper>
                    <DatePicker theDate={theDate} onChange={setTheDate} label='Beverages Purchases since' />
                    <SmartSelect data={beverages} onChange={beverageChangeHandler} value={beverage} />
                    <Stat color={Colors.blue} title='Total Orders' data={30} />
                    <Stat color={Colors.green} title='Total Cases' data={30} />
                    <Stat color={Colors.red} title='Special Prices' data={30} />
                </ActionWrapper>
            </ActionBar>
            <Body title='Beverage Report' header={<Header />}>
                <Reports>{beverageReport}</Reports>
            </Body>
        </Application>
    );
};

const Header = () => {
    return (
        <HeaderComponent>
            <p>Customer</p>
            <p>Cases</p>
            <p>Price Sold at</p>
            <p>Total</p>
        </HeaderComponent>
    );
};

const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-column-gap: 48px;
`;

const HeaderComponent = styled.div`
    display: grid;
    grid-template-columns: 260px 100px 1fr 140px;
    margin: 0 16px;
    p {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.greyText};
    }
`;

const Reports = styled.div`
    display: grid;
    grid-row-gap: 24px;
    .report-header {
        width: 100%;
        padding: 16px;
        display: grid;
        grid-template-columns: 260px 100px 1fr 140px;
        background-color: ${Colors.navy};
        border-radius: 4px 4px 0 0;
        p {
            color: ${Colors.white};
            text-transform: uppercase;
        }
    }
    .order {
        width: 100%;
        padding: 12px 16px;
        display: grid;
        grid-template-columns: 260px 100px 1fr 140px;
        border-bottom: 1px solid ${Colors.grey};
    }
`;

export default BeverageReport;
