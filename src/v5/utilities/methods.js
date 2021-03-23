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
export const calculateCart = (order) => {
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
        return combinedTotals;
    } catch (err) {
        console.log(err);
        return "Err";
    }
};
export const calculateMultipleOrders = (orders) => {
    try {
        return orders.length < 2
            ? CalculateCart(orders)
            : orders
                  .map((x) => {
                      console.log(CalculateCart(x));
                      return CalculateCart(x);
                  })
                  .reduce((a, b) => parseFloat(a) + parseFloat(b))
                  .toFixed(2);
    } catch (error) {
        console.log(error);
        return "ERR";
    }
};
