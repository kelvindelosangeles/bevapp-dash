import React from "react";
import colors from "../constants/Colors";
import firebase from "firebase";
export const formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
};
export const calculateOrder = (order) => {
    let cart = order.cart;
    let specialPrices = order.customer.specialPrices;

    //Pass in a cart object to calculate the total
    try {
        let cartArray = Object.values(cart);
        let itemTotal = cartArray.map((i) => {
            // checks if theres a special price
            const price = specialPrices && specialPrices[i.id] ? specialPrices[i.id].price : i.price;

            return (parseFloat(price) * i.qty).toFixed(2);
        });
        let combinedTotals = itemTotal.reduce((a, b) => {
            return (parseFloat(a) + parseFloat(b)).toFixed(2);
        });
        return "$" + combinedTotals;
    } catch (err) {
        console.log(err);
        return "Err";
    }
};
export const calculateMultipleOrders = (orders) => {
    try {
        return orders.length == 1
            ? calculateOrder(orders[0]).substring(1)
            : orders
                  .map((x) => {
                      return calculateOrder(x).substring(1);
                  })
                  .reduce((a, b) => parseFloat(a) + parseFloat(b))
                  .toFixed(2);
    } catch (error) {
        console.log(error);
        return "ERR";
    }
};
export const calculatePayment = (order) => {
    if (!order.payment) {
        return "";
    }

    const totalPayment = parseFloat(order.payment.totalPayment);
    const totalCredit = parseFloat(order.payment.totalCredit);
    const payment = (totalPayment + totalCredit).toFixed(2);
    return "$" + payment;
};
export const calculateMultiplePayment = (orders) => {
    try {
        return (
            orders
                // process each order
                .map((a) => {
                    // if the order is missing a payment return 0
                    if (!a.payment) {
                        return 0;
                    }
                    // if the order has a payment return how much was paid plus the credits
                    return parseFloat(calculatePayment(a).substring(1));
                })
                .reduce((b, c) => {
                    return b + c;
                })
                .toFixed(2)
        );
    } catch (error) {
        console.log(error);
    }
};
export const calculateBalance = (order) => {
    if (!order.payment) {
        return "";
    }
    // use substring to remove the dollar sign from the number
    const payment = calculatePayment(order).substring(1);
    const orderTotal = calculateOrder(order).substring(1);
    const balance = (orderTotal - payment).toFixed(2);

    return "$" + balance;
};
export const calculateMultipleBalances = (orders) => {
    return orders
        .map((a) => {
            if (!a.payment) {
                // if the there is no paymetnt information return the full order value
                return parseFloat(calculateOrder(a).substring(1));
            }

            return parseFloat(calculateBalance(a).substring(1));
        })
        .reduce((b, c) => {
            return b + c;
        })
        .toFixed(2);
};
export const checkPaymentStatus = (order) => {
    // if a payment doesnt exist
    if (!order.payment) {
        return null;
    }
    // if an order is signed
    if (order.payment.sign) {
        return (
            <p className='status' style={{ backgroundColor: colors.purple }}>
                Signed
            </p>
        );
    }

    if (calculateBalance(order).substring(1) > 0) {
        return (
            <p className='status' style={{ backgroundColor: colors.orange, color: colors.black }}>
                Partial Payment
            </p>
        );
    }

    if (calculatePayment(order) == calculateOrder(order)) {
        return (
            <p className='status' style={{ backgroundColor: colors.green }}>
                Paid
            </p>
        );
    }

    return <p className='status'>error</p>;
};
export const checkPaymentStatusMobile = (order) => {
    // if a payment doesnt exist
    if (!order.payment) {
        return null;
    }
    // if an order is signed
    if (order.payment.sign) {
        return colors.purple;
    }

    if (calculateBalance(order).substring(1) > 0) {
        return colors.orange;
    }

    if (calculatePayment(order) == calculateOrder(order)) {
        return colors.green;
    }

    return colors.black;
};

// Temporary for firebase based database

export const getAllOrdersFromRoutes = async () => {
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

        return data;
    } catch (error) {
        console.log(error);
        window.alert("An error has occured");
    }
};

// ===NOTE===
// when calculating numbers only reuse primatives to avoid chained errors
