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

  static isCartEmpty = cart => {
    // returns a Boolean
    return Object.values(cart).length < 1;
  };
}
