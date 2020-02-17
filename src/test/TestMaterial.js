// Dashbaord orders
const initialState = {
  orders: {
    "20021704d1142daa": {
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
        createdAt: "Feb 17, 3:57",
        createdBy: "Admin",
        orderID: "20021704d1142daa"
      },
      order: {
        "A&W2LI": {
          brand: "A&W",
          id: "A&W2LI",
          category: "soda",
          description: "A&W 2liter bottle",
          packaging: "bottle",
          size: "2liter",
          price: "9.69",
          qty: 1
        },
        AMS12P: {
          brand: "Amstel Lite",
          id: "AMS12P",
          category: "beer",
          description: "Amstel Lite 12oz bottle 12pk",
          packaging: "bottle",
          size: "12oz",
          price: "32.65",
          qty: 1
        },
        AMS12B: {
          brand: "Amstel Lite",
          id: "AMS12B",
          category: "beer",
          description: "Amstel Lite 12oz bottle",
          packaging: "bottle",
          size: "12oz",
          price: "33.95",
          qty: 1
        },
        ALO16B: {
          brand: "Aloevine",
          id: "ALO16B",
          category: "juice",
          description: "Aloevine 16oz bottle",
          packaging: "bottle",
          size: "16oz",
          price: "16.95",
          qty: 1
        },
        "ALO1.5": {
          brand: "Aloe",
          id: "ALO1.5",
          category: "juice",
          description: "Aloe 1.5liter bottle",
          packaging: "bottle",
          size: "1.5liter",
          price: "21.95",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217469b710caa": {
      customer: {
        firstLetter: "0-9",
        name: "2278 deli and grocery",
        address: "2278 7th ave",
        city: "nyc",
        telephone: "3476092493",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 3:57",
        createdBy: "Admin",
        orderID: "200217469b710caa"
      },
      order: {
        AMS12B: {
          brand: "Amstel Lite",
          id: "AMS12B",
          category: "beer",
          description: "Amstel Lite 12oz bottle",
          packaging: "bottle",
          size: "12oz",
          price: "33.95",
          qty: 1
        }
      },
      editedOrder: {
        order: {
          "A&W20B": {
            brand: "A&W",
            id: "A&W20B",
            category: "soda",
            description: "A&W 20oz bottle",
            packaging: "bottle",
            size: "20oz",
            price: "18.99",
            qty: 68
          },
          AMS12P: {
            brand: "Amstel Lite",
            id: "AMS12P",
            category: "beer",
            description: "Amstel Lite 12oz bottle 12pk",
            packaging: "bottle",
            size: "12oz",
            price: "32.65",
            qty: 1
          },
          "7UP1LI": {
            brand: "7UP",
            id: "7UP1LI",
            category: "soda",
            description: "7UP 1liter bottle",
            packaging: "bottle",
            size: "1liter",
            price: "12.99",
            qty: 1
          }
        },
        details: { editedAt: "Feb 17, 4:05", editedBy: "admin" }
      }
    },
    "200217c9265119aa": {
      customer: {
        firstLetter: "0-9",
        name: "2278 deli and grocery",
        address: "2278 7th ave",
        city: "nyc",
        telephone: "3476092493",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:17",
        createdBy: "Admin",
        orderID: "200217c9265119aa"
      },
      order: {
        "A&W2LI": {
          brand: "A&W",
          id: "A&W2LI",
          category: "soda",
          description: "A&W 2liter bottle",
          packaging: "bottle",
          size: "2liter",
          price: "9.69",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217bda49819aa": {
      customer: {
        firstLetter: "0-9",
        name: "315 finest food and deli",
        address: "315 pleasant ave",
        city: "nyc",
        telephone: "2128311044",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:18",
        createdBy: "Admin",
        orderID: "200217bda49819aa"
      },
      order: {
        "A&W20B": {
          brand: "A&W",
          id: "A&W20B",
          category: "soda",
          description: "A&W 20oz bottle",
          packaging: "bottle",
          size: "20oz",
          price: "18.99",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "2002177463762aaa": {
      customer: {
        firstLetter: "0-9",
        name: "315 finest food and deli",
        address: "315 pleasant ave",
        city: "nyc",
        telephone: "2128311044",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:18",
        createdBy: "Admin",
        orderID: "2002177463762aaa"
      },
      order: {
        "A&W2LI": {
          brand: "A&W",
          id: "A&W2LI",
          category: "soda",
          description: "A&W 2liter bottle",
          packaging: "bottle",
          size: "2liter",
          price: "9.69",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217ee79f99aaa": {
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
        createdAt: "Feb 17, 4:18",
        createdBy: "Admin",
        orderID: "200217ee79f99aaa"
      },
      order: {
        "7UP20B": {
          brand: "7UP",
          id: "7UP20B",
          category: "soda",
          description: "7UP 20oz bottle",
          packaging: "bottle",
          size: "20oz",
          price: "19.99",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217a2b2adc7aa": {
      customer: {
        firstLetter: "0-9",
        name: "172 deli grocery",
        address: "1230 st nicholas ave",
        city: "nyc",
        telephone: "2126851230",
        cr: "bb",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:18",
        createdBy: "Admin",
        orderID: "200217a2b2adc7aa"
      },
      order: {
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
      editedOrder: {}
    },
    "20021763f26176aa": {
      customer: {
        firstLetter: "0-9",
        name: "840 st nicholas food corp",
        address: "840 st nicholas ave",
        city: "nyc",
        telephone: "6463217347",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:18",
        createdBy: "Admin",
        orderID: "20021763f26176aa"
      },
      order: {
        AMS12B: {
          brand: "Amstel Lite",
          id: "AMS12B",
          category: "beer",
          description: "Amstel Lite 12oz bottle",
          packaging: "bottle",
          size: "12oz",
          price: "33.95",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217691131fbaa": {
      customer: {
        firstLetter: "0-9",
        name: "315 finest food and deli",
        address: "315 pleasant ave",
        city: "nyc",
        telephone: "2128311044",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:18",
        createdBy: "Admin",
        orderID: "200217691131fbaa"
      },
      order: {
        "7UP10B": {
          brand: "7UP",
          id: "7UP10B",
          category: "soda",
          description: "7UP 10oz bottle",
          packaging: "bottle",
          size: "10oz",
          price: "15.69",
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
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217b8b1a226aa": {
      customer: {
        firstLetter: "0-9",
        name: "172 deli grocery",
        address: "1230 st nicholas ave",
        city: "nyc",
        telephone: "2126851230",
        cr: "bb",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:23",
        createdBy: "Admin",
        orderID: "200217b8b1a226aa"
      },
      order: {
        "A&W2LI": {
          brand: "A&W",
          id: "A&W2LI",
          category: "soda",
          description: "A&W 2liter bottle",
          packaging: "bottle",
          size: "2liter",
          price: "9.69",
          qty: 1
        },
        AMS12P: {
          brand: "Amstel Lite",
          id: "AMS12P",
          category: "beer",
          description: "Amstel Lite 12oz bottle 12pk",
          packaging: "bottle",
          size: "12oz",
          price: "32.65",
          qty: 1
        },
        AMS12B: {
          brand: "Amstel Lite",
          id: "AMS12B",
          category: "beer",
          description: "Amstel Lite 12oz bottle",
          packaging: "bottle",
          size: "12oz",
          price: "33.95",
          qty: 1
        },
        ALO16B: {
          brand: "Aloevine",
          id: "ALO16B",
          category: "juice",
          description: "Aloevine 16oz bottle",
          packaging: "bottle",
          size: "16oz",
          price: "16.95",
          qty: 1
        },
        "ALO1.5": {
          brand: "Aloe",
          id: "ALO1.5",
          category: "juice",
          description: "Aloe 1.5liter bottle",
          packaging: "bottle",
          size: "1.5liter",
          price: "21.95",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "2002170e6de79baa": {
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
        createdAt: "Feb 17, 4:23",
        createdBy: "Admin",
        orderID: "2002170e6de79baa"
      },
      order: {
        "A&W20B": {
          brand: "A&W",
          id: "A&W20B",
          category: "soda",
          description: "A&W 20oz bottle",
          packaging: "bottle",
          size: "20oz",
          price: "18.99",
          qty: 1
        }
      },
      editedOrder: {}
    },
    "200217f52313c6aa": {
      customer: {
        firstLetter: "0-9",
        name: "87 street deli",
        address: "562 amsterdam ave",
        city: "nyc",
        telephone: "2125795385",
        cr: "cod",
        active: true,
        sla: null
      },
      details: {
        new: true,
        complete: false,
        createdAt: "Feb 17, 4:23",
        createdBy: "Admin",
        orderID: "200217f52313c6aa"
      },
      order: {
        ALO16B: {
          brand: "Aloevine",
          id: "ALO16B",
          category: "juice",
          description: "Aloevine 16oz bottle",
          packaging: "bottle",
          size: "16oz",
          price: "16.95",
          qty: 97
        }
      },
      editedOrder: {}
    }
  },
  activeOrder: {}
};


const order = {
  "A&W2LI": {
    brand: "A&W",
    id: "A&W2LI",
    category: "soda",
    description: "A&W 2liter bottle",
    packaging: "bottle",
    size: "2liter",
    price: "9.69",
    qty: 1
  },
  AMS12P: {
    brand: "Amstel Lite",
    id: "AMS12P",
    category: "beer",
    description: "Amstel Lite 12oz bottle 12pk",
    packaging: "bottle",
    size: "12oz",
    price: "32.65",
    qty: 1
  },
  AMS12B: {
    brand: "Amstel Lite",
    id: "AMS12B",
    category: "beer",
    description: "Amstel Lite 12oz bottle",
    packaging: "bottle",
    size: "12oz",
    price: "33.95",
    qty: 1
  },
  ALO16B: {
    brand: "Aloevine",
    id: "ALO16B",
    category: "juice",
    description: "Aloevine 16oz bottle",
    packaging: "bottle",
    size: "16oz",
    price: "16.95",
    qty: 1
  },
  "ALO1.5": {
    brand: "Aloe",
    id: "ALO1.5",
    category: "juice",
    description: "Aloe 1.5liter bottle",
    packaging: "bottle",
    size: "1.5liter",
    price: "21.95",
    qty: 1
  }
},
