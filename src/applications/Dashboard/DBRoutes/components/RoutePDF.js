import React from "react";
import moment from "moment";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Order as orderModel } from "../../../../Models/Order";

const RoutePDF = ({ route, driver }) => {
    const routesArray = Object.values(route);
    const TotalCases = () => {
        try {
            return routesArray
                .map((i) => {
                    return orderModel.CalculateCases(i.cart);
                })
                .reduce((a, b) => a + b);
        } catch (error) {
            console.log(error);
            return "err";
        }
    };

    const orderTotal = () => {
        try {
            return routesArray
                .map((x) => {
                    return orderModel.CalculateCart(x.cart, x.customer.specialPrices);
                })
                .reduce((a, b) => {
                    return (parseFloat(a) + parseFloat(b)).toFixed(2);
                });
        } catch (err) {
            console.log(err);
            return "0";
        }
    };
    return (
        <Document>
            <Page style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.header.text}>Route Sheet</Text>
                    <Text style={styles.header.text}>For route: {driver}</Text>
                    <Text style={styles.header.text}>{moment().format("LLL")}</Text>
                </View>
                <View style={styles.gridHeader}>
                    <Text style={styles.gridHeader.customer}>Customer</Text>
                    <Text style={styles.gridHeader.totalCases}>Total Cases</Text>
                    <Text style={styles.gridHeader.amount}>Invoice Amount</Text>
                    <Text style={styles.gridHeader.credit}>Credit</Text>
                </View>
                {routesArray.map((a) => {
                    return (
                        <View style={styles.grid}>
                            <Text style={styles.grid.customer}>{a.customer.address}</Text>
                            <Text style={styles.grid.totalCases}>{orderModel.CalculateCases(a.cart)}</Text>
                            <Text style={styles.grid.amount}>${orderModel.CalculateCart(a.cart, a.customer.specialPrices)}</Text>
                            <Text style={styles.grid.credit}></Text>
                        </View>
                    );
                })}

                <View style={{ paddingBottom: "20" }} />
                <View style={styles.footer}>
                    <Text>Total: </Text>
                    <Text>${orderTotal()}:</Text>
                </View>

                <View style={styles.footer}>
                    <Text>Cases: </Text>
                    <Text>{TotalCases()}:</Text>
                </View>
            </Page>
        </Document>
    );
};

const styles = {
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: {
        textAlign: "center",
        marginBottom: 50,
        text: {
            fontSize: 10,
            padding: 2,
        },
    },

    gridHeader: {
        fontSize: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
        paddingBottom: 8,
        borderBottom: "2",

        customer: { flexBasis: "50%" },
        totalCases: { flexBasis: "15%" },
        amount: { flexBasis: "20%" },
        credit: { flexBasis: "15%" },
    },
    grid: {
        fontSize: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        borderBottom: "2 dotted black",

        customer: { flexBasis: "50%", textTransform: "uppercase" },
        totalCases: { flexBasis: "15%" },
        amount: { flexBasis: "20%" },
        credit: { flexBasis: "15%" },
    },
    footer: {
        fontSize: 12,
        flexDirection: "row",
        paddingVertical: 2,
    },
};
export default RoutePDF;
