import React from "react";
import moment from "moment";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const TotalRoutePDF = ({ route, orders }) => {
    const TotalCases = () => {
        try {
            return route.orders
                .map((i) => {
                    return orderModel.CalculateCases(orders[i].cart);
                })
                .reduce((a, b) => a + b);
        } catch (error) {
            console.log(error);
            return "err";
        }
    };
    const orderTotal = () => {
        try {
            return route.orders
                .map((x) => {
                    return orderModel.CalculateCart(orders[x].cart, orders[x].customer.specialPrices);
                })
                .reduce((a, b) => {
                    return (parseFloat(a) + parseFloat(b)).toFixed(2);
                });
        } catch (err) {
            console.log(err);
            return "0";
        }
    };

    // combines all route customer copies
    const combinedCustomerPDFs = route.orders.map((x) => {
        let order = orders[x];

        return (
            <Page size='A4' style={$.page}>
                <View style={$.contact} fixed>
                    <Text>Alex Beverage</Text>
                    <Text>Beer and Soda Distributor</Text>
                    <Text>1231 Lafayette Avenue</Text>
                    <Text>Bronx, New York</Text>
                    <Text>(212) 304-8888</Text>
                    <Text>(718) 993-5555</Text>
                </View>
                <View style={$.heading} fixed>
                    <Text style={$.heading.customer}>{order.customer.address}</Text>
                    <Text style={$.heading.tax}>Tax and Deposits Included</Text>
                    <View style={$.heading.thanks}>
                        <Text>Thank you for your order</Text>
                        <Text style={$.heading.date}>{moment().format("MM/DD/2020")}</Text>
                    </View>
                    <Text style={$.heading.license}>LIC.NO.CO. 1301787</Text>
                </View>

                <View style={$.wrapper} fixed>
                    <View style={$.ordersHeader}>
                        <Text style={$.ordersHeader.c}>Cases</Text>
                        <Text style={$.ordersHeader.d}> Description</Text>
                        <Text style={$.ordersHeader.t}>Price</Text>
                    </View>
                </View>

                {/* ORDER ARRAY  */}
                {Object.values(order.cart)
                    .sort((a) => {
                        return a.hasOwnProperty("flavors") ? 1 : -1;
                    })
                    .map((i) => {
                        return (
                            <View style={$.wrapper} wrap={false}>
                                <View style={$.orders}>
                                    <View style={$.orders.c}>
                                        <Text> {i.qty} </Text>
                                    </View>
                                    <Text style={$.orders.d}>{i.description}</Text>
                                    <Text style={$.orders.t}>{orderModel.CalculateItem(i, order.customer.specialPrices)}</Text>
                                </View>
                            </View>
                        );
                    })}

                <View style={$.footer} wrap={false}>
                    <Text style={$.footer.cases}>Cases: {orderModel.CalculateCases(order.cart)}</Text>
                    <Text style={$.footer.total}>Total:$ {orderModel.CalculateCart(order.cart, order.customer.specialPrices)}</Text>
                    <View style={$.footer.input}>
                        <Text style={$.footer.input.text}>Credits</Text>
                        <View style={$.footer.line} />
                    </View>
                    <View style={$.footer.input}>
                        <Text style={$.footer.input.text}>Balance</Text>
                        <View style={$.footer.line} />
                    </View>
                    <View style={$.footer.input}>
                        <Text style={$.footer.input.text}>Amount Paid</Text>
                        <View style={$.footer.line} />
                    </View>
                    <View style={$.footer.input}>
                        <Text style={$.footer.input.text}>Signature Date</Text>
                        <View style={$.footer.line} />
                    </View>
                </View>
                <Text style={$.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
        );
    });
    // generate a route sumary sheet
    const RouteSummarySheet = () => {
        return (
            <Page style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.header.text}>Route Sheet</Text>
                    <Text style={styles.header.text}>For route: {route.driver.firstName}</Text>
                    <Text style={styles.header.text}>{moment().format("LLL")}</Text>
                </View>
                <View style={styles.gridHeader}>
                    <Text style={styles.gridHeader.customer}>Customer</Text>
                    <Text style={styles.gridHeader.totalCases}>Total Cases</Text>
                    <Text style={styles.gridHeader.amount}>Invoice Amount</Text>
                    <Text style={styles.gridHeader.credit}>Credit</Text>
                </View>
                {route.orders.map((a) => {
                    return (
                        <View style={styles.grid}>
                            <Text style={styles.grid.customer}>{orders[a].customer.address}</Text>
                            <Text style={styles.grid.totalCases}>{orderModel.CalculateCases(orders[a].cart)}</Text>
                            <Text style={styles.grid.amount}>${orderModel.CalculateCart(orders[a].cart, orders[a].customer.specialPrices)}</Text>
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
                <Text style={$.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
        );
    };

    return (
        <Document>
            {RouteSummarySheet()}
            {combinedCustomerPDFs}
        </Document>
    );
};

const $ = {
    pageNumber: {
        position: "absolute",
        fontSize: 10,
        top: 16,
        right: 16,
    },
    page: {
        fontSize: "10",
        padding: 16,
    },
    contact: {
        textAlign: "center",
        marginBottom: "20",
    },
    heading: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10",
        customer: {
            border: "1 solid black",
            borderRadius: "4",
            alignSelf: "flex-start",
            padding: "8",
            flexBasis: "30%",
        },
        tax: {
            textAlign: "center",
            flexBasis: "30%",
        },
        thanks: {
            flexBasis: "30%",
            alignItems: "center",
        },
        date: {
            marginTop: "4",
        },
        license: {
            marginTop: "12",
            flexBasis: "30%",
        },
    },

    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    ordersHeader: {
        width: "100%",
        flexDirection: "row",
        border: "1",
        borderRight: "none",
        borderLeft: "none",
        marginBottom: "8",
        paddingVertical: 4,
        c: { flexBasis: "10%" },
        d: { flexGrow: "1" },
        t: { flexBasis: "10%" },
    },
    orders: {
        paddingVertical: "2",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "baseline",
        width: "100%",
        marginBottom: 2,
        c: {
            flexBasis: "10%",
            textAlign: "center",
            paddingRight: "5%",
        },
        d: {
            flexGrow: "1",
            textTransform: "uppercase",
            fontSize: "11",
        },
        t: {
            flexBasis: "10%",
        },

        flavorsWrapper: {
            paddingVertical: "4",
            marginLeft: "25%",
            flexBasis: "65%",
            flexDirection: "row",
            flexWrap: "wrap",
        },
        flavor: {
            padding: "2 5",
        },
    },

    footer: {
        marginTop: "auto",
        fontSize: "10",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom: "10",
        cases: {
            flexBasis: "40%",
            marginBottom: 15,
        },
        total: {
            flexBasis: "40%",
            marginBottom: 15,
            textAlign: "right",
        },
        input: {
            flexBasis: "40%",
            marginBottom: 20,
            // backgroundColor: "yellow",
            text: {
                marginBottom: 40,
            },
        },
        line: {
            borderBottom: "1",
            height: 10,
            // maxWidth: 200,
        },
    },
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

export default TotalRoutePDF;
