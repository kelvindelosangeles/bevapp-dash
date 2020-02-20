import { Order } from "../../Models/Order";

const initialState = {
  newOrders: {
    "200220a2f8d33baa": {
      customer: {
        firstLetter: "0-9",
        name: "1978 1st ave news stand",
        address: "1978 frst ave",
        city: "nyc",
        telephone: "6467642159",
        cr: "bb",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 20, 4:15",
        createdBy: "Admin",
        orderID: "200220a2f8d33baa"
      },
      cart: {
        "7UP2LI": {
          brand: "7UP",
          id: "7UP2LI",
          category: "soda",
          description: "7UP 2liter bottle",
          packaging: "bottle",
          size: "2liter",
          price: "9.95",
          qty: 1
        }
      },
      editedOrder: {
        cart: {
          "7UP2LI": {
            brand: "7UP",
            id: "7UP2LI",
            category: "soda",
            description: "7UP 2liter bottle",
            packaging: "bottle",
            size: "2liter",
            price: "9.95",
            qty: 1
          },
          "A&W20B": {
            brand: "A&W",
            id: "A&W20B",
            category: "soda",
            description: "A&W 20oz bottle",
            packaging: "bottle",
            size: "20oz",
            price: "18.99",
            qty: 232
          }
        },
        details: { editedAt: "Feb 20, 7:05", editedBy: "admin" }
      }
    },
    "2002205bb93778aa": {
      customer: {
        firstLetter: "0-9",
        name: "1978 1st ave news stand",
        address: "1978 frst ave",
        city: "nyc",
        telephone: "6467642159",
        cr: "bb",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 20, 7:07",
        createdBy: "Admin",
        orderID: "2002205bb93778aa"
      },
      cart: {
        "A&W12C": {
          brand: "A&W",
          id: "A&W12C",
          category: "soda",
          description: "A&W 12oz can",
          packaging: "can",
          size: "12oz",
          price: "10.89",
          qty: 24
        },
        ALO16B: {
          brand: "Aloevine",
          id: "ALO16B",
          category: "juice",
          description: "Aloevine 16oz bottle",
          packaging: "bottle",
          size: "16oz",
          price: "16.95",
          qty: 2
        },
        "D&G12B": {
          brand: "D&G Asst. Flavors",
          id: "D&G12B",
          category: "soda",
          description: "D&G Asst. Flavors 12oz bottle",
          flavors: ["cream", "pineapple", "rootbear"],
          packaging: "bottle",
          size: "12oz",
          price: "23.95",
          qty: 88,
          flavorsQuantity: { cream: "32", pineapple: "12", rootbear: "44" }
        }
      },
      editedOrder: null
    }
  },
  activeOrder: {
    customer: {
      firstLetter: "0-9",
      name: "1978 1st ave news stand",
      address: "1978 frst ave",
      city: "nyc",
      telephone: "6467642159",
      cr: "bb",
      active: true,
      sla: null
    },
    details: {
      new: true,
      complete: false,
      createdAt: "Feb 20, 4:15",
      createdBy: "Admin",
      orderID: "200220a2f8d33baa"
    },
    cart: {
      "7UP2LI": {
        brand: "7UP",
        id: "7UP2LI",
        category: "soda",
        description: "7UP 2liter bottle",
        packaging: "bottle",
        size: "2liter",
        price: "9.95",
        qty: 1
      }
    },
    editedOrder: null
  }
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      const { customer, details, cart } = action;
      return {
        ...state,
        newOrders: {
          ...state.newOrders,
          [action.details.orderID]: new Order(customer, details, cart)
        }
      };
    case "SUBMIT_EDIT":
      return {
        ...state,
        newOrders: {
          ...state.newOrders,
          [action.details.orderID]: {
            ...state.newOrders[action.details.orderID],
            editedOrder: {
              cart: { ...action.cart },
              details: {
                editedAt: action.details.createdAt,
                editedBy: "admin"
              }
            }
          }
        },
        activeOrder: null
      };
    case "TOGGLE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "CLEAR_ORDER":
      return {
        ...state,
        activeOrder: null
      };
    case "SET_ACTIVE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "DELETE_ORDER":
      const { [action.orderID]: removed, ...remainingOrders } = state.newOrders;
      return {
        ...state,
        activeOrder: null,
        newOrders: {
          ...remainingOrders
        }
      };
    default:
      return state;
  }
};

export default DashboardReducer;
