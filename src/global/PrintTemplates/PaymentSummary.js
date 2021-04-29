import React from "react";
import { View, Text } from "@react-pdf/renderer";
import DocumentWrapper from "./components/DocumentWrapper";
import moment from "moment-timezone";
import { Order as ordersModel } from "../../Models/Order";
import { calculateBalance, calculateMultipleBalances } from "../../v5/utilities/methods";

const PaymentSummary = ({ route, orderTotal }) => {
    const { orders, details, driver } = route;

    const ordersArray = Object.values(orders);

    const calcTotalCredits = () => {
        const credits = ordersArray
            .map((a) => {
                return a.payment ? a.payment.totalCredit : 0.0;
            })
            .reduce((a, b) => {
                return (parseFloat(a) + parseFloat(b)).toFixed(2);
            });
        return "$" + credits;
    };
    const calcTotalChecks = () => {
        const checks = ordersArray
            .map((a) => {
                return a.payment ? Number(a.payment.payments.check) : 0.0;
            })
            .reduce((a, b) => {
                return (parseFloat(a) + parseFloat(b)).toFixed(2);
            });
        return "$" + checks;
    };
    const calcTotalCash = () => {
        const cash = ordersArray
            .map((a) => {
                return a.payment ? Number(a.payment.payments.cash) : 0.0;
            })
            .reduce((a, b) => {
                return (parseFloat(a) + parseFloat(b)).toFixed(2);
            });
        return "$" + cash;
    };
    const calcTotalpayment = () => {
        const total = ordersArray
            .map((a) => {
                return a.payment ? a.payment.totalPayment : 0.0;
            })
            .reduce((a, b) => {
                return (parseFloat(a) + parseFloat(b)).toFixed(2);
            });
        return "$" + total;
    };

    const TEMPCheckSigned = (order) => {
        try {
            return order.payment.sign ? "Signed" : "$" + order.payment.totalPayment;
        } catch (error) {
            return "$" + order.payment.totalPayment;
        }
    };

    return (
        <DocumentWrapper>
            <View style={$.header}>
                <Text style={$.header.title}>Payment summary Sheet</Text>
                <Text style={$.header.content}>For Route : {driver.firstName}</Text>
                <Text style={$.header.content}>{details.dates ? moment(details.dates.routeDate.date).format("L") : "N/A"}</Text>
            </View>
            <View style={$.dashedDivider}></View>
            <View style={$.dashedDivider}></View>

            <View style={$.contentHeading}>
                <Text style={$.contentHeading.customer}>Customer</Text>
                <Text style={$.contentHeading.content}>Amount</Text>
                <Text style={$.contentHeading.content}>Credit</Text>
                <Text style={$.contentHeading.content}>Check</Text>
                <Text style={$.contentHeading.content}>Cash</Text>
                <Text style={$.contentHeading.content}>Total collected</Text>
                <Text style={$.contentHeading.content}>Balance</Text>
            </View>
            <View style={$.solidDivider}></View>
            {ordersArray.map((a) => {
                return (
                    <View style={$.order} key={a.details.orderID}>
                        <Text style={$.order.customer}>{a.customer.address}</Text>
                        <Text style={$.order.content}>{"$" + ordersModel.CalculateCart(a.cart, a.customer.specialPrices)}</Text>
                        <Text style={$.order.content}>{a.payment && "$" + a.payment.totalCredit}</Text>
                        <Text style={$.order.content}>{a.payment && "$" + Number(a.payment.payments.check)}</Text>
                        <Text style={$.order.content}>{a.payment && "$" + Number(a.payment.payments.cash)}</Text>
                        <Text style={$.order.content}>{a.payment && TEMPCheckSigned(a)}</Text>
                        <Text style={$.order.content}>{a.payment && calculateBalance(a)}</Text>
                    </View>
                );
            })}

            <View style={$.dashedDivider}></View>
            <View style={$.order}>
                <Text style={$.order.customer}></Text>
                <Text style={$.order.content}>{"$" + orderTotal}</Text>
                <Text style={$.order.content}>{calcTotalCredits()}</Text>
                <Text style={$.order.content}>{calcTotalChecks()}</Text>
                <Text style={$.order.content}>{calcTotalCash()}</Text>
                <Text style={$.order.content}>{calcTotalpayment()}</Text>
                <Text style={$.order.content}>${calculateMultipleBalances(orders)}</Text>
            </View>
        </DocumentWrapper>
    );
};

const $ = {
    header: {
        textAlign: "center",
        marginBottom: 10,
        textTransform: "uppercase",
        title: {
            marginBottom: 4,
        },
        content: {
            marginBottom: 4,
        },
    },
    dashedDivider: {
        width: "100%",
        marginBottom: 8,
        borderBottom: "1 dashed black",
    },
    solidDivider: {
        width: "100%",
        marginTop: 4,
        marginBottom: 8,
        borderBottom: "1 solid black",
    },
    contentHeading: {
        display: "flex",
        flexDirection: "row",
        customer: {
            flexBasis: "20%",
            textTransform: "uppercase",
            fontSize: 6,
            paddingTop: 24,
            paddingRight: 8,
        },
        content: {
            paddingTop: 24,
            fontSize: 6,
            textTransform: "uppercase",
            flexBasis: "13.3%",
        },
    },
    order: {
        display: "flex",
        flexDirection: "row",
        paddingBottom: 8,
        marginBottom: 4,
        borderBottom: "1 solid lightgrey",
        customer: {
            flexBasis: "20%",
            textTransform: "uppercase",
            fontSize: 8,
            paddingRight: 8,
        },
        content: {
            fontSize: 8,
            textTransform: "uppercase",
            flexBasis: "13.3%",
        },
    },
};
export default PaymentSummary;
