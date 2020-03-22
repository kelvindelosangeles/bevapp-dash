import moment from "moment";

console.log();

export class Order {
  constructor(customer, details, cart) {
    this.customer = customer;
    this.details = {
      new: true,
      complete: false,
      createdAt: details.createdAt,
      createdBy: details.createdBy || "default admin",
      orderID: details.orderID,
      notes: details.notes || ""
    };
    this.cart = cart || {};
    this.editedOrder = null;
  }

  static formatTel = tel => {
    return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
  };

  static CalculateCart = cart => {
    //Pass in a cart object to calculate the total
    try {
      let cartArray = Object.values(cart);
      let itemTotal = cartArray.map(i => {
        return (parseFloat(i.price) * i.qty).toFixed(2);
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

  static CalculateItem = cartItem => {
    try {
      const itemTotal = (
        parseFloat(cartItem.price) * parseFloat(cartItem.qty)
      ).toFixed(2);
      return itemTotal;
    } catch (err) {
      console.log(err);
      return "Err";
    }
  };

  static CalculateCases = cart => {
    try {
      let cartArray = Object.values(cart);
      let quantities = cartArray.map(i => {
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

  static CalculateRevenue = orders => {
    try {
      let CalculateCart = cart => {
        try {
          let cartArray = Object.values(cart);
          let itemTotal = cartArray.map(i => {
            return (parseFloat(i.price) * i.qty).toFixed(2);
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
      let Today = moment(new Date()).format("YYMMDD");

      let orderTotals = Object.values(orders)
        .filter(
          i =>
            // filter checks that the order has details and was taken today
            i.details && i.details.orderID.includes(Today)
        )
        .map(i => {
          return CalculateCart(i.cart);
        });
      let revenue = orderTotals.reduce((a, b) => {
        return (parseFloat(a) + parseFloat(b)).toFixed(2);
      });

      return revenue;
    } catch (error) {
      console.log(error);
      return "err";
    }
  };

  static isCartEmpty = cart => {
    // returns a Boolean
    return Object.values(cart).length < 1;
  };
}
