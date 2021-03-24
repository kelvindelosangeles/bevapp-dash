import React from "react";

import DocumentWrapper from "./components/DocumentWrapper";
import PageTitle from "./components/PageTitle";
import { View, Text } from "@react-pdf/renderer";
import Divider from "./components/Divider";

const PaymentReportPDF = ({ order, total, driver, date, balance }) => {
    console.log(order);
    return (
        <DocumentWrapper>
            <PageTitle text='Payment Summary' />

            <Text style={$.section.header}>Order Details </Text>
            <View style={$.header}>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Customer</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Order ID</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Date</Text>
            </View>
            <Divider mt={6} mb={6} />
            <View style={$.header}>
                <Text style={$.header.text}>{order.customer.address}</Text>
                <Text style={$.header.text}>{order.details.orderID}</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>{date}</Text>
            </View>
            <View style={$.seperator} />
            {/* ============================
            Report
            ============================ */}
            <Text style={$.section.header}>Summary </Text>
            <View style={$.header}>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Order total</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Credits</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Total Payments</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Balance</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Driver</Text>
            </View>
            <Divider mt={6} mb={6} />
            <View style={$.header}>
                <Text style={$.header.text}>$ {total}</Text>
                <Text style={$.header.text}>$ {order.payment.totalCredit}</Text>
                <Text style={$.header.text}>$ {order.payment.totalPayment}</Text>
                <Text style={$.header.text}>{balance}</Text>
                <Text style={$.header.text}>{driver}</Text>
            </View>
            {/* ============================
            Credits
            ============================ */}
            <View style={$.seperator} />
            <Text style={$.section.header}>Credits </Text>
            <View style={$.header}>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Price Adjustment</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Breakage</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Returned cans/bottles</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Returned to flair</Text>
            </View>
            <Divider mt={6} mb={6} />
            <View style={$.header}>
                <Text style={$.header.text}>$ {order.payment.credits.priceAdjustment}</Text>
                <Text style={$.header.text}>$ {order.payment.credits.breakage}</Text>
                <Text style={$.header.text}>$ {order.payment.credits.returnedContainers}</Text>
                <Text style={$.header.text}>$ {order.payment.credits.returnedToFlair}</Text>
            </View>
            <View style={$.seperator} />
            {/* ============================
            Payment Methods 
            ============================ */}
            <Text style={$.section.header}>Payment Methods </Text>
            <View style={$.header}>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Cash</Text>
                <Text style={{ ...$.header.text, textTransform: "uppercase", fontSize: 7 }}>Check</Text>
            </View>
            <Divider mt={6} mb={6} />
            <View style={$.header}>
                <Text style={$.header.text}>$ {order.payment.payments.cash}</Text>
                <Text style={$.header.text}>$ {order.payment.payments.check}</Text>
            </View>
            <View style={$.seperator} />
        </DocumentWrapper>
    );
};

const $ = {
    header: {
        flexDirection: "row",
        text: {
            flexBasis: "20%",
            fontSize: 9,
        },
    },
    section: {
        header: {
            fontSize: 10,
            marginBottom: 12,
            textDecoration: "underline",
        },
    },
    seperator: {
        marginBottom: 40,
    },
};

export default PaymentReportPDF;
