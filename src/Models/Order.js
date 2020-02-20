export class Order {
  constructor(customer, details, cart) {
    this.customer = customer;
    this.details = {
      new: true,
      complete: false,
      createdAt: details.createdAt,
      createdBy: details.createdBy || "default admin",
      orderID: details.orderID
    };
    this.cart = cart || {};
    this.editedOrder = null;
  }
}
