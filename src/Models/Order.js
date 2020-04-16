import moment from "moment";

export class Order {
    constructor(customer, details, cart) {
        this.customer = customer;
        this.details = {
            new: true,
            complete: false,
            createdAt: details.createdAt,
            createdBy: details.createdBy || "default admin",
            orderID: details.orderID,
            notes: details.notes || "",
        };
        this.cart = cart || {};
        this.editedOrder = null;
    }

    static formatTel = (tel) => {
        tel = String(tel);
        return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
    };

    static CalculateItem = (beverage, specialPrices) => {
        // Tries to extract a price from specialPrices and if theres an error it returns the original price
        const generatePrice = () => {
            try {
                return specialPrices[beverage.id].price;
            } catch (error) {
                return beverage.price;
            }
        };
        const quantity = beverage.qty;

        try {
            return "$ " + (parseFloat(generatePrice()) * parseFloat(quantity)).toFixed(2);
        } catch (error) {
            console.log(error);
            console.log("There was a problem in CalcItem");
            return "Err";
        }
    };

    // ^^^ REFACTORED ^^^

    static CalculateCart = (cart, specialPrices) => {
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
            return combinedTotals;
        } catch (err) {
            console.log(err);
            return "Err";
        }
    };

    static CalculateCases = (cart) => {
        try {
            let cartArray = Object.values(cart);
            let quantities = cartArray.map((i) => {
                return Number(i.qty);
            });
            return quantities.reduce((a, b) => {
                return a + b;
            });
        } catch (err) {
            console.log(err);
            return "Err";
        }
    };

    static CalcMargin = (price, spPrice) => {
        return (parseFloat(price) - parseFloat(spPrice)).toFixed(2);
    };

    static CalculateRevenue = (orders) => {
        // FIXME: Clean up function
        let DateID = moment(new Date()).format("YYMMDD");

        let isDailyOrdersEmpty = () => {
            return (
                Object.values(orders).filter((i) => {
                    return i.details && i.details.orderID.includes(DateID);
                }).length < 0
            );
        };

        try {
            let CalculateCart = (cart, specialPrices) => {
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
                    return combinedTotals;
                } catch (err) {
                    console.log(err);
                    return "Err";
                }
            };

            let orderTotals = Object.values(orders)
                .filter(
                    (i) =>
                        // filter checks that the order has details and was taken today
                        i.details && i.details.orderID.includes(DateID)
                )
                .map((i) => {
                    return CalculateCart(i.cart, i.customer.specialPrices);
                });
            let revenue = orderTotals.reduce((a, b) => {
                return (parseFloat(a) + parseFloat(b)).toFixed(2);
            });
            return revenue;
        } catch (error) {
            console.log(error);
            return !isDailyOrdersEmpty() ? "0" : "err";
        }
    };

    static isCartEmpty = (cart) => {
        // returns a Boolean
        return Object.values(cart).length < 1;
    };
}
