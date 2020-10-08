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
import { Order as OrdersModel } from "../../Models/Order";

const BeverageReport = () => {
    const [orders, setOrders] = useState(null);
    const [reportData, setReportData] = useState([]);
    let [beverage, setBeverage] = useState(null);
    const [theDate, setTheDate] = useState(`${moment().format("MM")}/01/${moment().format("YYYY")}`);
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);
    const customers = useSelector((state) => state.Firestore.data.store.customers);

    const beverageChangeHandler = (e, value) => {
        value && setBeverage(value);
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
    const calcCasesOfTypeCostTotal = (list, beverage) => {
        return list
            .map((a) => {
                return calcCasesOfTypeCost(a, beverage);
            })
            .reduce((b, c) => {
                return (parseFloat(b) + parseFloat(c)).toFixed(2);
            });
    };
    const calcCasesOfTypeTotal = (list, beverage) => {
        return list
            .map((x) => {
                return x.cart[beverage.id].qty;
            })
            .reduce((y, z) => {
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

    useEffect(() => {
        beverage && setReportData([]);
        beverage &&
            setReportData(
                Object.entries(
                    orders
                        .filter((a) => {
                            // Date Filter
                            return moment(a.details.createdAt).isSameOrAfter(theDate);
                        })
                        .filter((b) => {
                            // beverage filter
                            return b.cart.hasOwnProperty(beverage.id);
                        })
                        .reduce((x, y) => {
                            // check if the function already added a customer thats being called ViewAgendaOutlined, if so merge it into that object otherwise create a new one.
                            const mergeReports = () => {
                                try {
                                    return { ...x, [y.customer.id]: [...x[y.customer.id], y] };
                                } catch (error) {
                                    return { ...x, [y.customer.id]: [y] };
                                }
                            };
                            return mergeReports();
                        }, {})
                )
            );
    }, [beverage, theDate]);

    console.log(reportData);

    const beverageReport = () => {
        try {
            return (
                beverage &&
                reportData.length &&
                reportData.map((a) => {
                    return (
                        <div className='report'>
                            <div className='report-header'>
                                <div>
                                    <p>{customers[a[0]].address}</p>
                                    <p className='tel'>{OrdersModel.formatTel(customers[a[0]].telephone)}</p>
                                </div>
                                <p>{calcCasesOfTypeTotal(a[1], beverage)}</p>
                                <p></p>
                                <p>${calcCasesOfTypeCostTotal(a[1], beverage)}</p>
                            </div>
                            {a[1].map((b) => {
                                return (
                                    <div className='order'>
                                        <div>
                                            <p>{b.details.orderID}</p>
                                            <p className='date'>{moment(b.details.createdAt).format("LL")}</p>
                                        </div>

                                        <p>{b.cart[beverage.id].qty}</p>
                                        <p>${showPrice(b, b.cart[beverage.id])}</p>
                                        <p>{OrdersModel.CalculateItem(b.cart[beverage.id], b.customer.specialPrices)}</p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })
            );
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    return orders ? (
        <Application>
            <ActionBar>
                <ActionWrapper>
                    <DatePicker theDate={theDate} onChange={setTheDate} label='Beverages Purchases since' />
                    <SmartSelect data={beverages} onChange={beverageChangeHandler} value={beverage} />
                    <Stat color={Colors.blue} title='Total Orders' data={reportData.map((a) => a[1]).flat().length} />
                    <Stat color={Colors.green} title='Total Cases' data={"N/A"} />
                </ActionWrapper>
            </ActionBar>
            <Body title='Beverage Report' header={<Header />}>
                {/* <Reports>{beverageReport()}</Reports> */}
                <div style={{ columnCount: 4, columnGap: 32 }}>
                    {Object.values(beverages).map((x) => {
                        beverage = x;
                        let ordersFiltered = orders
                            .filter((a) => {
                                // Date Filter
                                return moment(a.details.createdAt).isSameOrAfter(theDate);
                            })
                            .filter((b) => {
                                // beverage filter
                                return b.cart.hasOwnProperty(beverage.id);
                            });
                        return (
                            ordersFiltered.length > 0 && (
                                <div style={{ display: "flex", marginBottom: "16px" }}>
                                    <h2 style={{ marginRight: "16px" }}>{beverage.id}</h2>
                                    <h3>
                                        {
                                            (beverage.id,
                                            ordersFiltered
                                                .map((d) => {
                                                    return d.cart[beverage.id].qty;
                                                })
                                                .reduce((j, k) => {
                                                    return parseInt(j) + parseInt(k);
                                                }))
                                        }
                                        Cases
                                    </h3>
                                </div>
                            )
                        );
                    })}
                </div>
            </Body>
        </Application>
    ) : (
        <h1 style={{ color: "white", width: "100%", padding: 24, textAlign: "center" }}>Loading</h1>
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
    grid-column-gap: 12px;
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
        grid-column-gap: 12px;
        background-color: ${Colors.navy};
        border-radius: 4px 4px 0 0;
        font-weight: 600;
        p {
            color: ${Colors.white};
            text-transform: uppercase;
        }
        .tel {
            font-weight: 400;
            font-size: 13px;
            margin-top: 4px;
            color: ${Colors.lightGrey};
        }
    }
    .order {
        :nth-child(even) {
            background-color: ${Colors.lightGrey};
        }
        width: 100%;
        padding: 12px 16px;
        display: grid;
        grid-template-columns: 260px 100px 1fr 140px;
        grid-column-gap: 12px;
        border-bottom: 1px solid ${Colors.grey};
        font-weight: 600;
        .date {
            font-size: 12px;
            color: ${Colors.greyText};
            font-weight: 400;
        }
    }
`;

export default BeverageReport;
