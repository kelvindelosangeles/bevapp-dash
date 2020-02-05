export class Order {
  constructor(customer, details, order) {
    this.customer = customer;
    this.details = {
      new: true,
      complete: false,
      createdAt: details.createdAt,
      createdBy: details.createdBy || "default admin",
      orderID: details.orderID
    };
    this.order = order || {};
    this.editedOrder = {};
  }
}
