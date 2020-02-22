const beverages = {
  "7UP12C": {
    brand: "7UP",
    category: "soda",
    description: "7UP 12oz can",
    id: "7UP12C",
    packaging: "can",
    price: "10.99",
    size: "12oz"
  },
  "7UP1LI": {
    brand: "7UP",
    category: "soda",
    description: "7UP 1liter bottle",
    id: "7UP1LI",
    packaging: "bottle",
    price: "12.99",
    size: "1liter"
  },
  "7UP20B": {
    brand: "7UP",
    category: "soda",
    description: "7UP 20oz bottle",
    id: "7UP20B",
    packaging: "bottle",
    price: "19.99",
    size: "20oz"
  },
  "7UP2LI": {
    brand: "7UP",
    category: "soda",
    description: "7up 2liter bottle",
    id: "7UP2LI",
    packaging: "bottle",
    price: "9.95",
    size: "2liter"
  },
  "A&W12C": {
    brand: "A&W",
    category: "soda",
    description: "A&W 12oz can",
    id: "A&W12C",
    packaging: "can",
    price: "10.89",
    size: "12oz"
  },
  "A&W20B": {
    brand: "A&W",
    category: "soda",
    description: "A&W 20oz bottle",
    id: "A&W20B",
    packaging: "bottle",
    price: "18.99",
    size: "20oz"
  },
  "A&W2LI": {
    brand: "A&W",
    category: "soda",
    description: "A&W 2liter bottle",
    id: "A&W2LI",
    packaging: "bottle",
    price: "9.69",
    size: "2liter"
  },
  "ALO1.5": {
    brand: "Aloe",
    category: "juice",
    description: "Aloe 1.5liter bottle",
    id: "ALO1.5",
    packaging: "bottle",
    price: "21.95",
    size: "1.5liter"
  },
  ALO16B: {
    brand: "Aloevine",
    category: "juice",
    description: "Aloevine 16oz bottle",
    id: "ALO16B",
    packaging: "bottle",
    price: "16.95",
    size: "16oz"
  },
  AMS12B: {
    brand: "Amstel Lite",
    category: "beer",
    description: "Amstel Lite 12oz bottle",
    id: "AMS12B",
    packaging: "bottle",
    price: "33.95",
    size: "12oz"
  },
  AMS12P: {
    brand: "Amstel Lite",
    category: "beer",
    description: "Amstel Lite 12oz bottle 12pk",
    id: "AMS12P",
    packaging: "bottle",
    price: "32.65",
    size: "12oz"
  },
  ANO12B: {
    brand: "Angry Orchard",
    category: "beer",
    description: "Angry Orchard 12oz bottle",
    id: "ANO12B",
    packaging: "bottle",
    price: "34.89",
    size: "12oz"
  },
  ANS12B: {
    brand: "Anchor Steam",
    category: "beer",
    description: "Anchor Steam 12oz bottle",
    id: "ANS12B",
    packaging: "bottle",
    price: "35.69",
    size: "12oz"
  },
  ARI1GA: {
    brand: "Arizona",
    category: "juice",
    description: "Arizona 1 gallon",
    flavors: [
      "fruit punch",
      "mango",
      "grape",
      "kiwi",
      "iced tea",
      "half & half"
    ],
    id: "ARI1GA",
    packaging: "bottle",
    price: "11.99",
    size: "1 gallon"
  },
  ARI20B: {
    brand: "Arizona",
    category: "juice",
    description: "Arizona 20oz bottle",
    id: "ARI20B",
    packaging: "bottle",
    price: "17.39",
    size: "20oz"
  },
  ARI24C: {
    brand: "Arizona",
    category: "juice",
    description: "Arizona 24oz can",
    id: "ARI24C",
    packaging: "can",
    price: "17.49",
    size: "24oz"
  },
  ASA12B: {
    brand: "Asahi",
    category: "beer",
    description: "Asahi 12oz bottle",
    id: "ASA12B",
    packaging: "bottle",
    price: "36.39",
    size: "12oz"
  },
  ASA22B: {
    brand: "Asahi",
    category: "beer",
    description: "Asahi 22oz bottle",
    id: "ASA22B",
    packaging: "bottle",
    price: "40.49",
    size: "22oz"
  },
  ASA24C: {
    brand: "Asahi",
    category: "beer",
    description: "Asahi 24oz can",
    id: "ASA24C",
    packaging: "can",
    price: "32.49",
    size: "24oz"
  },
  ASA32C: {
    brand: "Asahi",
    category: "beer",
    description: "Asahi 32oz can",
    id: "ASA32C",
    packaging: "can",
    price: "40.49",
    size: "32oz"
  },
  ASA33C: {
    brand: "Asahi",
    category: "beer",
    description: "Asahi 33oz can",
    id: "ASA33C",
    packaging: "can",
    price: "44.69",
    size: "33oz"
  },
  ASA34C: {
    brand: "Asahi",
    category: "beer",
    description: "Asahi 34oz can",
    id: "ASA34C",
    packaging: "can",
    price: "35.69",
    size: "34oz"
  },
  "B&J12B": {
    brand: "Bartles & James",
    category: "beer",
    description: "Bartles & James 12oz bottle",
    id: "B&J12B",
    packaging: "bottle",
    price: "27.95",
    size: "12oz"
  },
  BAA12B: {
    brand: "Bad Ass",
    category: "beer",
    description: "Bad Ass 12oz bottle",
    id: "BAA12B",
    packaging: "bottle",
    price: "34.69",
    size: "12oz"
  },
  BAC12B: {
    brand: "Bacardi",
    category: "beer",
    description: "Bacardi 12oz bottle",
    id: "BAC12B",
    packaging: "bottle",
    price: "27.89",
    size: "12oz"
  },
  BAI16B: {
    brand: "Bai",
    category: "juice",
    description: "Bai 16oz bottle",
    id: "BAI16B",
    packaging: "bottle",
    price: "18.95",
    size: "16oz"
  },
  BAL12C: {
    brand: "Ballentiness Ale",
    category: "beer",
    description: "Ballentiness Ale 12oz can",
    id: "BAL12C",
    packaging: "can",
    price: "20.69",
    size: "12oz"
  },
  BAL16C: {
    brand: "Ballentiness Ale",
    category: "beer",
    description: "Ballentiness Ale 16oz can",
    id: "BAL16C",
    packaging: "can",
    price: "21.99",
    size: "16oz"
  },
  BAL22B: {
    brand: "Ballentines Ale",
    category: "beer",
    description: "Ballentines Ale 22oz bottle",
    id: "BAL22B",
    packaging: "bottle",
    price: "22.49",
    size: "22oz"
  },
  BAL40B: {
    brand: "Ballentines Ale",
    category: "beer",
    description: "Ballentines Ale 40oz bottle",
    id: "BAL40B",
    packaging: "bottle",
    price: "28.95",
    size: "40oz"
  },
  BAS12B: {
    brand: "Bass Ale",
    category: "beer",
    description: "Bass Ale 12oz bottle",
    id: "BAS12B",
    packaging: "bottle",
    price: "31.99",
    size: "12oz"
  },
  BAS22B: {
    brand: "Bass Ale",
    category: "beer",
    description: "Bass Ale 22oz bottle",
    id: "BAS22B",
    packaging: "bottle",
    price: "25.99",
    size: "22oz"
  },
  BAT12B: {
    brand: "Ballast",
    category: "beer",
    description: "Ballast 12oz bottle",
    id: "BAT12B",
    packaging: "bottle",
    price: "49.69",
    size: "12oz"
  },
  BCH24C: {
    brand: "Busch",
    category: "beer",
    description: "Busch 24oz can",
    id: "BCH24C",
    packaging: "can",
    price: "19.95",
    size: "24oz"
  },
  BDK12B: {
    brand: "Becks Dark",
    category: "beer",
    description: "Becks Dark 12oz bottle",
    id: "BDK12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  BEC12B: {
    brand: "Becks",
    category: "beer",
    description: "Becks 12oz bottle",
    id: "BEC12B",
    packaging: "bottle",
    price: "32.95",
    size: "12oz"
  },
  BEC12P: {
    brand: "Becks",
    category: "beer",
    description: "Becks 12oz bottle loose",
    id: "BEC12P",
    packaging: "bottle loose",
    price: "28.95",
    size: "12oz"
  },
  BEC16C: {
    brand: "Becks",
    category: "beer",
    description: "Becks 16oz can",
    id: "BEC16C",
    packaging: "can",
    price: "22.99",
    size: "16oz"
  },
  BEC22B: {
    brand: "Becks",
    category: "beer",
    description: "Becks 22oz bottle",
    id: "BEC22B",
    packaging: "bottle",
    price: "30.95",
    size: "22oz"
  },
  BEC24C: {
    brand: "Becks",
    category: "beer",
    description: "Becks 24oz can",
    id: "BEC24C",
    packaging: "can",
    price: "30.49",
    size: "24oz"
  },
  BEL12B: {
    brand: "Bells",
    category: "beer",
    description: "Bells 12oz bottle",
    id: "BEL12B",
    packaging: "bottle",
    price: "43.95",
    size: "12oz"
  },
  BEN12B: {
    brand: "Becks Non Alcohol",
    category: "beer",
    description: "Becks Non Alcohol 12oz bottle",
    id: "BEN12B",
    packaging: "bottle",
    price: "27.95",
    size: "12oz"
  },
  BES1LI: {
    brand: "Best",
    category: "beer",
    description: "Best 1liter bottle",
    id: "BES1LI",
    packaging: "bottle",
    price: "13.99",
    size: "1liter"
  },
  BEST9B: {
    brand: "Best Asst.",
    category: "beer",
    description: "Best Asst. 9oz bottle",
    id: "BEST9B",
    packaging: "bottle",
    price: "17.39",
    size: "9oz"
  },
  BEX12B: {
    brand: "Becks Lite",
    category: "beer",
    description: "Becks Lite 12oz bottle",
    id: "BEX12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  BIB16B: {
    brand: "Big Burst",
    category: "juice",
    description: "Big Burst 16oz bottle",
    id: "BIB16B",
    packaging: "bottle",
    price: "9.39",
    size: "16oz"
  },
  BIP12B: {
    brand: "Brooklyn Beer IPA",
    category: "beer",
    description: "Brooklyn Beer IPA 12oz bottle",
    id: "BIP12B",
    packaging: "bottle",
    price: "38.95",
    size: "12oz"
  },
  BLA24C: {
    brand: "Blast",
    category: "beer",
    description: "Blast 24oz can",
    id: "BLA24C",
    packaging: "can",
    price: "15.49",
    size: "24oz"
  },
  BLM12B: {
    brand: "Blue Moon",
    category: "beer",
    description: "Blue Moon 12oz bottle",
    flavors: ["honey wheat", "mango", "white belgian"],
    id: "BLM12B",
    packaging: "bottle",
    price: "32.95",
    size: "12oz"
  },
  BLM12P: {
    brand: "Blue Moon",
    category: "beer",
    description: "Blue Moon 12oz bottle loose",
    flavors: ["honey wheat", "mango", "white belgian"],
    id: "BLM12P",
    packaging: "bottle loose",
    price: "31.45",
    size: "12oz"
  },
  BLM22B: {
    brand: "Blue Moon",
    category: "beer",
    description: "Blue Moon 22oz bottle",
    flavors: ["honey wheat", "mango", "white belgian"],
    id: "BLM22B",
    packaging: "bottle",
    price: "33.99",
    size: "22oz"
  },
  BLM24C: {
    brand: "Blue Moon",
    category: "beer",
    description: "Blue Moon 24oz can",
    flavors: ["honey wheat", "mango", "white belgian"],
    id: "BLM24C",
    packaging: "can",
    price: "29.89",
    size: "24oz"
  },
  BLP12B: {
    brand: "Blue Point",
    category: "beer",
    description: "Blue Point 12oz bottle",
    id: "BLP12B",
    packaging: "bottle",
    price: "42.89",
    size: "12oz"
  },
  BLX12B: {
    brand: "Bud Lite Lime",
    category: "beer",
    description: "Bud Lite Lime 12oz bottle",
    id: "BLX12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  BLX12C: {
    brand: "Bud Lite Lime",
    category: "beer",
    description: "Bud Lite Lime 12oz can",
    id: "BLX12C",
    packaging: "can",
    price: "25.39",
    size: "12oz"
  },
  BLX22B: {
    brand: "Bud Lite Lime",
    category: "beer",
    description: "Bud Lite Lime 22oz bottle",
    id: "BLX22B",
    packaging: "bottle",
    price: "28.39",
    size: "22oz"
  },
  BLX24C: {
    brand: "Bud Lite Lime",
    category: "beer",
    description: "Bud Lite Lime 24oz can",
    id: "BLX24C",
    packaging: "can",
    price: "31.69",
    size: "24oz"
  },
  BOH12B: {
    brand: "Bohemia",
    category: "beer",
    description: "Bohemia 12oz bottle",
    id: "BOH12B",
    packaging: "bottle",
    price: "29.95",
    size: "12oz"
  },
  BRB12B: {
    brand: "Brookyn Beer",
    category: "beer",
    description: "Brookyn Beer 9oz",
    flavors: ["i.p.a", "lager", "pilsner"],
    id: "BRB12B",
    packaging: "bottle",
    price: "34.39",
    size: "9oz"
  },
  BRB12P: {
    brand: "Brookyn Beer",
    category: "beer",
    description: "Brookyn Beer 12oz bottle loose",
    flavors: ["i.p.a", "lager", "pilsner"],
    id: "BRB12P",
    packaging: "bottle loose",
    price: "31.95",
    size: "12oz"
  },
  BRI12C: {
    brand: "Brisk Iced Tea",
    category: "juice",
    description: "Brisk Iced Tea 12oz can",
    id: "BRI12C",
    packaging: "can",
    price: "13.49",
    size: "12oz"
  },
  BRI20B: {
    brand: "Brisk Iced Tea",
    category: "juice",
    description: "Brisk Iced Tea 20oz bottle",
    id: "BRI20B",
    packaging: "bottle",
    price: "19.99",
    size: "20oz"
  },
  BRI2LI: {
    brand: "Brisk Iced Tea",
    category: "juice",
    description: "Brisk Iced Tea 2liter bottle",
    id: "BRI2LI",
    packaging: "bottle",
    price: "11.79",
    size: "2liter"
  },
  BRS16C: {
    brand: "Bud Rita",
    category: "beer",
    description: "Bud Rita 16oz can",
    flavors: ["mango", "passion", "lemon", "lime", "grape", "peach"],
    id: "BRS16C",
    packaging: "can",
    price: "32.99",
    size: "16oz"
  },
  BRS24C: {
    brand: "Bud Rita",
    category: "beer",
    description: "Bud Rita 24oz can",
    flavors: ["strawberry", "cranberry"],
    id: "BRS24C",
    packaging: "can",
    price: "34.99",
    size: "24oz"
  },
  BSA12B: {
    brand: "Becks Saphire",
    category: "beer",
    description: "Becks Saphire 12oz bottle",
    id: "BSA12B",
    packaging: "bottle",
    price: "30.49",
    size: "12oz"
  },
  BSP12B: {
    brand: "Bud Rita Splash",
    category: "beer",
    description: "Bud Rita Splash 12oz",
    id: "BSP12B",
    packaging: "bottle",
    price: "35.99",
    size: "12oz"
  },
  BUC24C: {
    brand: "Budweiser Chelada",
    category: "beer",
    description: "Budweiser Chelada 24oz can",
    id: "BUC24C",
    packaging: "can",
    price: "32.95",
    size: "24oz"
  },
  BUD10C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 10oz can",
    id: "BUD10C",
    packaging: "can",
    price: "15.89",
    size: "10oz"
  },
  BUD12B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 12oz bottle",
    id: "BUD12B",
    packaging: "bottle",
    price: "28.69",
    size: "12oz"
  },
  BUD12C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 12oz can",
    id: "BUD12C",
    packaging: "can",
    price: "18.69",
    size: "12oz"
  },
  BUD12P: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 12oz bottle loose",
    id: "BUD12P",
    packaging: "bottle loose",
    price: "25.95",
    size: "12oz"
  },
  BUD16B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 16oz bottle",
    id: "BUD16B",
    packaging: "bottle",
    price: "33.69",
    size: "16oz"
  },
  BUD16C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 16oz can",
    id: "BUD16C",
    packaging: "can",
    price: "33.99",
    size: "16oz"
  },
  BUD18B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 18oz bottle",
    id: "BUD18B",
    packaging: "bottle",
    price: "17.99",
    size: "18oz"
  },
  BUD20B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 12oz bottle 20pk",
    id: "BUD20B",
    packaging: "bottle",
    price: "13.99",
    size: "12oz"
  },
  BUD22B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 22oz bottle",
    id: "BUD22B",
    packaging: "bottle",
    price: "28.49",
    size: "22oz"
  },
  BUD24C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 24oz can",
    id: "BUD24C",
    packaging: "can",
    price: "28.69",
    size: "24oz"
  },
  BUD30C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 12oz can 30pk",
    id: "BUD30C",
    packaging: "can",
    price: "22.99",
    size: "12oz"
  },
  BUD32B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 32oz bottle",
    id: "BUD32B",
    packaging: "bottle",
    price: "26.99",
    size: "32oz"
  },
  BUD36C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 24oz can 36pk",
    id: "BUD36C",
    packaging: "can",
    price: "24.95",
    size: "24oz"
  },
  BUD40B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 40oz bottle",
    id: "BUD40B",
    packaging: "bottle",
    price: "35.99",
    size: "40oz"
  },
  BUD7B: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 7oz bottle",
    id: "BUD7B",
    packaging: "bottle",
    price: "17.95",
    size: "7oz"
  },
  BUD8C: {
    brand: "Budweiser",
    category: "beer",
    description: "Budweiser 8oz can",
    id: "BUD8C",
    packaging: "can",
    price: "17.95",
    size: "8oz"
  },
  BUI12B: {
    brand: "Bud Ice",
    category: "beer",
    description: "Bud Ice 12oz bottle",
    id: "BUI12B",
    packaging: "bottle",
    price: "26.99",
    size: "12oz"
  },
  BUI12C: {
    brand: "Bud Ice",
    category: "beer",
    description: "Bud Ice 12oz can",
    id: "BUI12C",
    packaging: "can",
    price: "18.99",
    size: "12oz"
  },
  BUI22B: {
    brand: "Bud Ice",
    category: "beer",
    description: "Bud Ice 22oz bottle",
    id: "BUI22B",
    packaging: "bottle",
    price: "28.95",
    size: "22oz"
  },
  BUI24C: {
    brand: "Bud Ice",
    category: "beer",
    description: "Bud Ice 24oz can",
    id: "BUI24C",
    packaging: "can",
    price: "28.39",
    size: "24oz"
  },
  BUI40B: {
    brand: "Bud Ice",
    category: "beer",
    description: "Bud Ice 40oz bottle",
    id: "BUI40B",
    packaging: "bottle",
    price: "35.99",
    size: "40oz"
  },
  BUR16C: {
    brand: "Bud Rita",
    category: "beer",
    description: "Bud Rita 16oz can",
    id: "BUR16C",
    packaging: "can",
    price: "33.69",
    size: "16oz"
  },
  BUR24C: {
    brand: "Bud Rita",
    category: "beer",
    description: "Bud Rita 24oz",
    id: "BUR24C",
    packaging: "can",
    price: "34.99",
    size: "24oz"
  },
  BUR8C: {
    brand: "Bud Rita",
    category: "beer",
    description: "Bud Rita 8oz can",
    id: "BUR8C",
    packaging: "can",
    price: "23.95",
    size: "8oz"
  },
  BUS22B: {
    brand: "Bud Select",
    category: "beer",
    description: "Bud Select 22oz bottle",
    id: "BUS22B",
    packaging: "bottle",
    price: "23.49",
    size: "22oz"
  },
  BUS24C: {
    brand: "Bud Select",
    category: "beer",
    description: "Bud Select 24oz can",
    id: "BUS24C",
    packaging: "can",
    price: "23.55",
    size: "24oz"
  },
  BUX10C: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 10oz can",
    id: "BUX10C",
    packaging: "can",
    price: "16.49",
    size: "10oz"
  },
  BUX12B: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 12oz bottle",
    id: "BUX12B",
    packaging: "bottle",
    price: "28.69",
    size: "12oz"
  },
  BUX12C: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 12oz can",
    id: "BUX12C",
    packaging: "can",
    price: "24.49",
    size: "12oz"
  },
  BUX16B: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 16oz bottle",
    id: "BUX16B",
    packaging: "bottle",
    price: "33.69",
    size: "16oz"
  },
  BUX16C: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 16oz can",
    id: "BUX16C",
    packaging: "can",
    price: "33.99",
    size: "16oz"
  },
  BUX18B: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 18oz bottle",
    id: "BUX18B",
    packaging: "bottle",
    price: "17.99",
    size: "18oz"
  },
  BUX22B: {
    brand: "Bud Lite",
    category: "beer",
    description: "Bud Lite 22oz bottle",
    id: "BUX22B",
    packaging: "bottle",
    price: "28.69",
    size: "22oz"
  },
  BUX24C: {
    brand: "Bud Light",
    category: "beer",
    description: "Bud light 24oz can,",
    id: "BUX24C",
    packaging: "can",
    price: "28.69",
    size: "24oz"
  },
  BUX30C: {
    brand: "Bud",
    category: "beer",
    description: "Bud Light 12oz can 30pk",
    id: "BUX30C",
    packaging: "can",
    price: "24.49",
    size: "12oz"
  },
  BUX36C: {
    brand: "Bud Light",
    category: "beer",
    description: "Bud Light 12oz can 36pk",
    id: "BUX36C",
    packaging: "can",
    price: "24.95",
    size: "12oz"
  },
  BUX40B: {
    brand: "Bud Light",
    category: "beer",
    description: "Bud Light 40oz bottle",
    id: "BUX40B",
    packaging: "bottle",
    price: "35.99",
    size: "40oz"
  },
  BXA16C: {
    brand: "Bud Light",
    category: "beer",
    description: "Bud Light aluminum 16oz can",
    id: "BXA16C",
    packaging: "can",
    price: "26.99",
    size: "16oz"
  },
  BXP12B: {
    brand: "Bud Light",
    category: "beer",
    description: "Bud Light platinum 12oz bottle 12pk",
    id: "BXP12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  BXP22B: {
    brand: "Bud Light",
    category: "beer",
    description: "Bud Light platinum 22oz bottle",
    id: "BXP22B",
    packaging: "bottle",
    price: "26.99",
    size: "22oz"
  },
  C0016C: {
    brand: "Coors",
    category: "beer",
    description: "Coors 16oz can",
    id: "C0016C",
    packaging: "can",
    price: "31.95",
    size: "16oz"
  },
  C0030C: {
    brand: "Coors",
    category: "beer",
    description: "Coors 12oz can 30pk",
    id: "C0030C",
    packaging: "can",
    price: "23.99",
    size: "12oz"
  },
  C0R32B: {
    brand: "Corona Familiar",
    category: "beer",
    description: "Corona Extra bottle",
    id: "C0R32B",
    packaging: "bottle",
    price: "39.49",
    size: "32oz"
  },
  CAB12B: {
    brand: "Carta Blanca",
    category: "beer",
    description: "Carta Blanca 12oz bottle",
    id: "CAB12B",
    packaging: "bottle",
    price: "30.95",
    size: "12oz"
  },
  CAB32B: {
    brand: "Carta Blanca",
    category: "beer",
    description: "Carta Blanca 32oz bottle",
    id: "CAB32B",
    packaging: "bottle",
    price: "29.2",
    size: "32oz"
  },
  CAD10B: {
    brand: "Canada Dry",
    category: "soda",
    description: "Canada dry 10oz bottle",
    id: "CAD10B",
    packaging: "bottle",
    price: "18.69",
    size: "10oz"
  },
  CAD12C: {
    brand: "Canada Dry",
    category: "soda",
    description: "Canada dry 12oz can",
    id: "CAD12C",
    packaging: "can",
    price: "10.69",
    size: "12oz"
  },
  CAD1LI: {
    brand: "Canada Dry",
    category: "soda",
    description: "Canada dry 1liter bottle",
    id: "CAD1LI",
    packaging: "bottle",
    price: "15.95",
    size: "1liter"
  },
  CAD20B: {
    brand: "Canada Dry",
    category: "soda",
    description: "Canada dry 20oz bottle",
    flavors: ["seltzer", "gingerale", "lemon-lime", "pomegranate"],
    id: "CAD20B",
    packaging: "bottle",
    price: "19.95",
    size: "12oz"
  },
  CAD2LI: {
    brand: "Canada Dry",
    category: "soda",
    description: "Canada dry 2liter bottle",
    id: "CAD2LI",
    packaging: "bottle",
    price: "9.89",
    size: "2liter"
  },
  CAD8C: {
    brand: "Canada Dry",
    category: "soda",
    description: "Canada dry 8oz can",
    id: "CAD8C",
    packaging: "can",
    price: "11.39",
    size: "8oz"
  },
  CAJ12B: {
    brand: "Cayman Jack",
    category: "beer",
    description: "Cayman Jack 11oz bottle",
    id: "CAJ12B",
    packaging: "bottle",
    price: "34.49",
    size: "11oz"
  },
  CAL12B: {
    brand: "Captain Lawrence",
    category: "beer",
    description: "Captain Lawrence 12oz bottle",
    id: "CAL12B",
    packaging: "bottle",
    price: "34.39",
    size: "12oz"
  },
  CAPR6B: {
    brand: "Capri Sun",
    category: "juice",
    description: "Capri Sun 6.75oz pouches",
    id: "CAPR6B",
    packaging: "pouch",
    price: "9.95",
    size: "6.75oz"
  },
  CAPR6P: {
    brand: "Capri Sun",
    category: "juice",
    description: "Capri Sun 40/ 6 OZ",
    id: "CAPR6P",
    packaging: "pouch",
    price: "9.95",
    size: "6oz"
  },
  CAR12B: {
    brand: "Carib",
    category: "beer",
    description: "Carib 12oz bottle",
    id: "CAR12B",
    packaging: "bottle",
    price: "32.95",
    size: "12oz"
  },
  CCR12C: {
    brand: "Coco Rico",
    category: "soda",
    description: "Coco Rico 12oz can",
    id: "CCR12C",
    packaging: "can",
    price: "11.95",
    size: "12oz"
  },
  CCR16C: {
    brand: "Coco Rico",
    category: "soda",
    description: "Coco Rico 16oz can",
    id: "CCR16C",
    packaging: "can",
    price: "19.49",
    size: "16oz"
  },
  CCR20B: {
    brand: "Coco Rico",
    category: "soda",
    description: "Coco Rico 20oz bottle",
    id: "CCR20B",
    packaging: "bottle",
    price: "20.89",
    size: "20oz"
  },
  CCR2LI: {
    brand: "Coco Rico",
    category: "soda",
    description: "Coco Rico 2liter bottle",
    id: "CCR2LI",
    packaging: "bottle",
    price: "10.99",
    size: "2liter"
  },
  CCS12B: {
    brand: "Country Club",
    category: "soda",
    description: "Country club soda 12oz bottle",
    id: "CCS12B",
    packaging: "bottle",
    price: "20.49",
    size: "12oz"
  },
  CCS2LI: {
    brand: "Country Club",
    category: "soda",
    description: "Country club soda 2liter bottle",
    id: "CCS2LI",
    packaging: "bottle",
    price: "10.99",
    size: "2liter"
  },
  CHG12B: {
    brand: "Champ Ale",
    category: "beer",
    description: "Champ Ale 12oz bottle",
    id: "CHG12B",
    packaging: "bottle",
    price: "23.89",
    size: "12oz"
  },
  CHG22B: {
    brand: "Champ Ale",
    category: "beer",
    description: "Champ Ale 22oz bottle",
    id: "CHG22B",
    packaging: "bottle",
    price: "25.99",
    size: "22oz"
  },
  CIB12B: {
    brand: "Cider Boys",
    category: "beer",
    description: "Cider boys 12oz bottle",
    id: "CIB12B",
    packaging: "bottle",
    price: "29.49",
    size: "12oz"
  },
  CIC8C: {
    brand: "Ciclon",
    category: "soda",
    description: "Ciclon 8.3oz can",
    id: "CIC8C",
    packaging: "can",
    price: "26.95",
    size: "8.3oz"
  },
  CLA12C: {
    brand: "Clamato",
    category: "beer",
    description: "Clamato 12oz can",
    id: "CLA12C",
    packaging: "can",
    price: "15.99",
    size: "12oz"
  },
  CLA16B: {
    brand: "Clamato",
    category: "beer",
    description: "Clamato 16oz bottle",
    id: "CLA16B",
    packaging: "bottle",
    price: "17.99",
    size: "16oz"
  },
  CLA5C: {
    brand: "Clamato",
    category: "beer",
    description: "Clamato 5.5oz can",
    id: "CLA5C",
    packaging: "can",
    price: "13.49",
    size: "5.5oz"
  },
  COC12C: {
    brand: "Country Club",
    category: "soda",
    description: "Country club 12oz can",
    id: "COC12C",
    packaging: "can",
    price: "19.95",
    size: "12oz"
  },
  COC16C: {
    brand: "Country Club",
    category: "soda",
    description: "Country club 16oz can",
    id: "COC16C",
    packaging: "can",
    price: "18.95",
    size: "16oz"
  },
  COC22B: {
    brand: "Country Club",
    category: "soda",
    description: "Country club 22oz bottle",
    id: "COC22B",
    packaging: "bottle",
    price: "16.99",
    size: "22oz"
  },
  COC4OB: {
    brand: "Country Club",
    category: "soda",
    description: "Country club 40oz bottle",
    id: "COC4OB",
    packaging: "bottle",
    price: "24.69",
    size: "40oz"
  },
  COF12B: {
    brand: "Corona",
    category: "beer",
    description: "Corona familiar 12oz bottle",
    id: "COF12B",
    packaging: "bottle",
    price: "33.95",
    size: "12oz"
  },
  COF32B: {
    brand: "Corona",
    category: "beer",
    description: "Corona familiar 32oz bottle",
    id: "COF32B",
    packaging: "bottle",
    price: "39.49",
    size: "32oz"
  },
  COI12B: {
    brand: "Coney Island Asso.",
    category: "beer",
    description: "Coney Island Asso. 12oz bottle",
    id: "COI12B",
    packaging: "bottle",
    price: "39.95",
    size: "12oz"
  },
  COK10B: {
    brand: "Coke",
    category: "soda",
    description: "Coke 10oz bottle",
    id: "COK10B",
    packaging: "bottle",
    price: "18.69",
    size: "10oz"
  },
  COK12B: {
    brand: "Coke",
    category: "soda",
    description: "Coke 12oz bottle",
    id: "COK12B",
    packaging: "bottle",
    price: "20.95",
    size: "12oz"
  },
  COK12C: {
    brand: "Coke",
    category: "soda",
    description: "Coke 12oz can",
    id: "COK12C",
    packaging: "bottle",
    price: "11.69",
    size: "12oz"
  },
  COK1LI: {
    brand: "Coke",
    category: "soda",
    description: "Coke 1liter bottle",
    id: "COK1LI",
    packaging: "bottle",
    price: "19.95",
    size: "1liter"
  },
  COK20B: {
    brand: "Coke",
    category: "soda",
    description: "Coke 20oz bottle",
    id: "COK20B",
    packaging: "bottle",
    price: "22.99",
    size: "20oz"
  },
  COK2LI: {
    brand: "Coke",
    category: "soda",
    description: "Coke 2liter bottle",
    id: "COK2LI",
    packaging: "bottle",
    price: "12.99",
    size: "2liter"
  },
  COK3LI: {
    brand: "Coke",
    category: "soda",
    description: "Cook 3liter bottle",
    id: "COK3LI",
    packaging: "bottle",
    price: "10.89",
    size: "3liter"
  },
  COK7B: {
    brand: "Coke",
    category: "soda",
    description: "Cook 7oz bottle",
    id: "COK7B",
    packaging: "bottle",
    price: "15.39",
    size: "7oz"
  },
  COK8B: {
    brand: "Coke",
    category: "soda",
    description: "Coke 8oz bottle",
    id: "COK8B",
    packaging: "bottle",
    price: "20.95",
    size: "8oz"
  },
  COL12C: {
    brand: "Colt 45",
    category: "beer",
    description: "Colt 45 12oz can",
    id: "COL12C",
    packaging: "can",
    price: "19.89",
    size: "12oz"
  },
  COL16B: {
    brand: "Colt 45",
    category: "beer",
    description: "Colt 45 16oz bottle",
    id: "COL16B",
    packaging: "bottle",
    price: "21.39",
    size: "16oz"
  },
  COL16C: {
    brand: "Colt 45",
    category: "beer",
    description: "Colt 45 16oz can",
    id: "COL16C",
    packaging: "can",
    price: "21.39",
    size: "16oz"
  },
  COL22B: {
    brand: "Colt 45",
    category: "beer",
    description: "Colt 45 22oz bottle",
    id: "COL22B",
    packaging: "bottle",
    price: "21.49",
    size: "22oz"
  },
  COL24C: {
    brand: "Colt 45",
    category: "beer",
    description: "Colt 45 24oz can",
    id: "COL24C",
    packaging: "can",
    price: "18.69",
    size: "24oz"
  },
  COL40B: {
    brand: "Colt 45",
    category: "beer",
    description: "Colt 45 40oz bottle",
    id: "COL40B",
    packaging: "bottle",
    price: "26.49",
    size: "40oz"
  },
  COO12B: {
    brand: "Coors",
    category: "beer",
    description: "Coors 12oz bottle",
    id: "COO12B",
    packaging: "bottle",
    price: "23.99",
    size: "12oz"
  },
  COO12C: {
    brand: "Coors",
    category: "beer",
    description: "Coors 12oz can",
    id: "COO12C",
    packaging: "can",
    price: "23.99",
    size: "12oz"
  },
  COO24C: {
    brand: "Coors",
    category: "beer",
    description: "Coors 24oz can",
    id: "COO24C",
    packaging: "can",
    price: "16.49",
    size: "24oz"
  },
  COO32B: {
    brand: "Coors",
    category: "beer",
    description: "Coors 32oz bottle",
    id: "COO32B",
    packaging: "bottle",
    price: "21.59",
    size: "32oz"
  },
  COO36C: {
    brand: "Coors",
    category: "beer",
    description: "Coors 12oz can 36pk",
    id: "COO36C",
    packaging: "can",
    price: "23.99",
    size: "12oz"
  },
  COO40B: {
    brand: "Coors",
    category: "beer",
    description: "Coors 40oz bottle",
    id: "COO40B",
    packaging: "bottle",
    price: "28.99",
    size: "40oz"
  },
  COP12B: {
    brand: "Corona Premier",
    category: "beer",
    description: "Corona Premier 12oz bottle",
    id: "COP12B",
    packaging: "bottle",
    price: "33.95",
    size: "12oz"
  },
  COR12B: {
    brand: "Corona Extra",
    category: "beer",
    description: "Corona Extra 12oz bottle",
    id: "COR12B",
    packaging: "bottle",
    price: "32.49",
    size: "12oz"
  },
  COR12C: {
    brand: "Corona Extra",
    category: "beer",
    description: "Corona Extra 12oz can",
    id: "COR12C",
    packaging: "can",
    price: "32.39",
    size: "12oz"
  },
  COR12P: {
    brand: "Corona Extra",
    category: "beer",
    description: "Corona Extra 12oz bottle loose",
    id: "COR12P",
    packaging: "bottle loose",
    price: "30.99",
    size: "12oz"
  },
  COR16C: {
    brand: "Corona",
    category: "beer",
    description: "Corona 16oz can",
    id: "COR16C",
    packaging: "can",
    price: "37.49",
    size: "16oz"
  },
  COR22B: {
    brand: "Corona Extra",
    category: "beer",
    description: "Corona Extra 22oz bottle",
    id: "COR22B",
    packaging: "bottle",
    price: "30.89",
    size: "22oz"
  },
  COR24C: {
    brand: "Corona Extra",
    category: "beer",
    description: "Corona Extra 24oz can",
    id: "COR24C",
    packaging: "can",
    price: "30.89",
    size: "24oz"
  },
  COR32B: {
    brand: "Corona Familiar",
    category: "beer",
    description: "Corona Familiar 32oz bottle",
    id: "COR32B",
    packaging: "bottle",
    price: "39.49",
    size: "32oz"
  },
  COR7B: {
    brand: "Coronita Extra",
    category: "beer",
    description: "Coronita Extra 9oz bottle",
    id: "COR7B",
    packaging: "bottle",
    price: "22.89",
    size: "9oz"
  },
  COT20B: {
    brand: "Country Time Lemonade",
    category: "juice",
    description: "Country Time Lemonade 20oz bottle",
    id: "COT20B",
    packaging: "bottle",
    price: "16.89",
    size: "20oz"
  },
  COT2LI: {
    brand: "Country Time",
    category: "juice",
    description: "Country Time 2liter",
    id: "COT2LI",
    packaging: "bottle",
    price: "16.95",
    size: "2liter"
  },
  COW1LI: {
    brand: "Core Water",
    category: "water",
    description: "Core Water 1liter",
    id: "COW1LI",
    packaging: "bottle",
    price: "16.95",
    size: "1liter"
  },
  COW20B: {
    brand: "Core Water",
    category: "water",
    description: "Core Water 20oz bottle",
    id: "COW20B",
    packaging: "bottle",
    price: "25.95",
    size: "20oz"
  },
  COW24B: {
    brand: "Core Water",
    category: "water",
    description: "Core Water 24oz bottle",
    id: "COW24B",
    packaging: "bottle",
    price: "27.89",
    size: "24oz"
  },
  COW30B: {
    brand: "Core Water",
    category: "water",
    description: "Core Water 30oz bottle",
    id: "COW30B",
    packaging: "bottle",
    price: "16.89",
    size: "32oz"
  },
  COX12B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 12oz bottle",
    id: "COX12B",
    packaging: "bottle",
    price: "20.99",
    size: "12oz"
  },
  COX12C: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 12oz can",
    id: "COX12C",
    packaging: "can",
    price: "23.99",
    size: "12oz"
  },
  COX12P: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 12oz bottle loose",
    id: "COX12P",
    packaging: "bottle loose",
    price: "20.95",
    size: "12oz"
  },
  COX16B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 16oz bottle",
    id: "COX16B",
    packaging: "bottle",
    price: "28.34",
    size: "16oz"
  },
  COX16C: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 16oz can",
    id: "COX16C",
    packaging: "can",
    price: "32.95",
    size: "16oz"
  },
  COX20B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 12oz bottle 20pk",
    id: "COX20B",
    packaging: "bottle",
    price: "14.99",
    size: "12oz"
  },
  COX22B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 22oz bottle",
    id: "COX22B",
    packaging: "bottle",
    price: "25.95",
    size: "22oz"
  },
  COX24C: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 24oz can",
    id: "COX24C",
    packaging: "can",
    price: "21.95",
    size: "24oz"
  },
  COX30C: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 12oz can 30pk",
    id: "COX30C",
    packaging: "can",
    price: "22.89",
    size: "12oz"
  },
  COX32B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 32oz bottle",
    id: "COX32B",
    packaging: "bottle",
    price: "26.89",
    size: "32oz"
  },
  COX36C: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 12oz can 36pk",
    id: "COX36C",
    packaging: "can",
    price: "23.99",
    size: "12oz"
  },
  COX40B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 40oz bottle",
    id: "COX40B",
    packaging: "bottle",
    price: "33.69",
    size: "40oz"
  },
  COX7B: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 7oz bottle",
    id: "COX7B",
    packaging: "bottle",
    price: "19.89",
    size: "9oz"
  },
  COX8C: {
    brand: "Coors Lite",
    category: "beer",
    description: "Coors Lite 8oz can",
    id: "COX8C",
    packaging: "can",
    price: "18.39",
    size: "8oz"
  },
  CRC12P: {
    brand: "Corona",
    category: "beer",
    description: "Corona 12oz bottle loose",
    id: "CRC12P",
    packaging: "bottle loose",
    price: "29.69",
    size: "12oz"
  },
  CRS24C: {
    brand: "Crazy Stallion",
    category: "beer",
    description: "Crazy Stallion 24oz can",
    id: "CRS24C",
    packaging: "can",
    price: "22.99",
    size: "24oz"
  },
  CRS40B: {
    brand: "Crazy Stallion",
    category: "beer",
    description: "Crazy Stallion 40oz bottle",
    id: "CRS40B",
    packaging: "bottle",
    price: "17.59",
    size: "40oz"
  },
  CRU12B: {
    brand: "Crush",
    category: "soda",
    description: "Crush 12oz bottle",
    flavors: ["orange", "grape", "pineapple"],
    id: "CRU12B",
    packaging: "bottle",
    price: "21.99",
    size: "12oz"
  },
  CRU12C: {
    brand: "Crush",
    category: "soda",
    description: "Crush 12oz can",
    flavors: ["orange", "grape", "pineapple"],
    id: "CRU12C",
    packaging: "can",
    price: "10.99",
    size: "12oz"
  },
  CRU20B: {
    brand: "Crush",
    category: "soda",
    description: "Crush 20oz bottle",
    flavors: ["orange", "grape", "pineapple"],
    id: "CRU20B",
    packaging: "bottle",
    price: "21.99",
    size: "20oz"
  },
  CRU2LI: {
    brand: "Crush",
    category: "soda",
    description: "Crush 2liter bottle",
    flavors: ["orange", "grape", "pineapple"],
    id: "CRU2LI",
    packaging: "bottle",
    price: "10.89",
    size: "2liter"
  },
  CRX12B: {
    brand: "Corona Lite",
    category: "beer",
    description: "Corona 12oz bottle",
    id: "CRX12B",
    packaging: "bottle",
    price: "32.49",
    size: "12oz"
  },
  CRY12B: {
    brand: "Crystal",
    category: "water",
    description: "Crystal 12oz bottle",
    id: "CRY12B",
    packaging: "bottle",
    price: "28.69",
    size: "12oz"
  },
  CXA16C: {
    brand: "Coors Lite Bullet",
    category: "beer",
    description: "Coors Lite Bullet 16oz can",
    id: "CXA16C",
    packaging: "can",
    price: "21.89",
    size: "16oz"
  },
  "D&G12B": {
    brand: "D&G Asst. Flavors",
    category: "soda",
    description: "D&G Asst. Flavors 12oz bottle",
    flavors: ["rootbear", "cream", "pineapple"],
    id: "D&G12B",
    packaging: "bottle",
    price: "23.95",
    size: "12oz"
  },
  DES20B: {
    brand: "Dasani",
    category: "water",
    description: "Dasani 20oz bottle",
    id: "DES20B",
    packaging: "bottle",
    price: "8.99",
    size: "20oz"
  },
  DMT12B: {
    brand: "Dogfish Midas Touch",
    category: "beer",
    description: "Dogfish Midas Touch 12oz bottle",
    id: "DMT12B",
    packaging: "bottle",
    price: "84.99",
    size: "12oz"
  },
  DOD12B: {
    brand: "Flying Dog",
    category: "beer",
    description: "Flying Dog 12oz bottle",
    id: "DOD12B",
    packaging: "bottle",
    price: "51.95",
    size: "12oz"
  },
  DOE12B: {
    brand: "Dos Equis",
    category: "beer",
    description: "Dos Equis 12oz bottle",
    id: "DOE12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  DOF12B: {
    brand: "Dogfish",
    category: "beer",
    description: "Dogfish 12oz bottle 60m",
    id: "DOF12B",
    packaging: "bottle",
    price: "39.95",
    size: "12oz"
  },
  DOG12B: {
    brand: "Dogfish Head",
    category: "beer",
    description: "Dogfish Head 12oz bottle 90m",
    id: "DOG12B",
    packaging: "bottle",
    price: "58.95",
    size: "12oz"
  },
  DOL46C: {
    brand: "Dole Pineapple Juice",
    category: "juice",
    description: "Dole Pineapple Juice 46oz can",
    id: "DOL46C",
    packaging: "can",
    price: "28.49",
    size: "46oz"
  },
  DOLE8C: {
    brand: "Dole Pineapple Juice",
    category: "juice",
    description: "Dole Pineapple Juice 8oz can",
    id: "DOLE8C",
    packaging: "can",
    price: "13.69",
    size: "8oz"
  },
  DRP12C: {
    brand: "Dr. Pepper",
    category: "soda",
    description: "Dr. Pepper 12oz can",
    id: "DRP12C",
    packaging: "can",
    price: "11.69",
    size: "12oz"
  },
  DRP20B: {
    brand: "Dr. Pepper",
    category: "soda",
    description: "Dr. Pepper 20oz bottle",
    id: "DRP20B",
    packaging: "bottle",
    price: "22.99",
    size: "20oz"
  },
  DRP2LI: {
    brand: "Dr. Pepper",
    category: "soda",
    description: "Dr. Pepper 2liter",
    id: "DRP2LI",
    packaging: "bottle",
    price: "12.99",
    size: "2liter"
  },
  DRS12B: {
    brand: "Dragon Stout",
    category: "beer",
    description: "Dragon Stout 12oz bottle",
    id: "DRS12B",
    packaging: "bottle",
    price: "34.89",
    size: "12oz"
  },
  EAR24C: {
    brand: "Earthquake",
    category: "beer",
    description: "Earthquake 24oz can",
    id: "EAR24C",
    packaging: "can",
    price: "7.99",
    size: "24oz"
  },
  EDM12B: {
    brand: "Extracto De Malta",
    category: "beer",
    description: "Extracto De Malta12oz bottle",
    id: "EDM12B",
    packaging: "bottle",
    price: "43.99",
    size: "12oz"
  },
  ELE12B: {
    brand: "Elephant",
    category: "beer",
    description: "Elephant 12oz bottle",
    id: "ELE12B",
    packaging: "bottle",
    price: "39.35",
    size: "12oz"
  },
  ENS24P: {
    brand: "Ensure",
    category: "dairy",
    description: "Ensure 24oz bottle loose",
    flavors: ["vanilla", "chocolate", "strawberry"],
    id: "ENS24P",
    packaging: "bottle loose",
    price: "31.49",
    size: "24oz"
  },
  ENS8C: {
    brand: "Ensure",
    category: "dairy",
    description: "Ensure 12oz bottle 30pk",
    flavors: ["vanilla", "chocolate", "strawberry"],
    id: "ENS8C",
    packaging: "bottle",
    price: "36.89",
    size: "12oz"
  },
  "ESS1,5": {
    brand: "essential",
    category: "water",
    description: "essential water 1.5 liter bottle",
    id: "ESS1.5",
    packaging: "bottle",
    price: "21.95",
    size: "1.5 li"
  },
  ESS1L1: {
    brand: "Essential",
    category: "dairy",
    description: "Essential 1liter bottle",
    id: "ESS1L1",
    packaging: "bottle",
    price: "18.95",
    size: "1liter"
  },
  ESS20B: {
    brand: "Essential",
    category: "dairy",
    description: "Essential 20oz bottle",
    id: "ESS20B",
    packaging: "bottle",
    price: "24.59",
    size: "20oz"
  },
  EST12B: {
    brand: "Estrella Jalisco",
    category: "beer",
    description: "Estrella Jalisco 12oz bottle",
    id: "EST12B",
    packaging: "bottle",
    price: "38.59",
    size: "12oz"
  },
  EVI1LI: {
    brand: "Evian",
    category: "water",
    description: "Evian 1liter",
    id: "EVI1LI",
    packaging: "bottle",
    price: "17.99",
    size: "1liter"
  },
  FAN12C: {
    brand: "Fanta",
    category: "soda",
    description: "Fanta 12oz can",
    id: "FAN12C",
    packaging: "can",
    price: "11.69",
    size: "12oz"
  },
  FAN20B: {
    brand: "Fanta",
    category: "soda",
    description: "Fanta 20oz bottle",
    id: "FAN20B",
    packaging: "bottle",
    price: "21.95",
    size: "20oz"
  },
  FAN2LI: {
    brand: "Fanta",
    category: "soda",
    description: "Fanta 2liter",
    id: "FAN2LI",
    packaging: "bottle",
    price: "13.95",
    size: "2liter"
  },
  FIJ16B: {
    brand: "Fiji",
    category: "water",
    description: "Fiji 16oz bottle",
    id: "FIJ16B",
    packaging: "bottle",
    price: "23.69",
    size: "16oz"
  },
  FIJ1LI: {
    brand: "Fiji",
    category: "water",
    description: "Fiji 1liter bottle",
    id: "FIJ1LI",
    packaging: "bottle",
    price: "20.95",
    size: "1liter"
  },
  FIJI1L: {
    brand: "Fiji",
    category: "water",
    description: "Fiji 1liter bottle",
    id: "FIJI1L",
    packaging: "bottle",
    price: "20.89",
    size: "1liter"
  },
  FLD12B: {
    brand: "Flying Dog",
    category: "beer",
    description: "Flying Dog 12oz bottle",
    id: "FLD12B",
    packaging: "bottle",
    price: "36.95",
    size: "12oz"
  },
  FLP12B: {
    brand: "Flower Power",
    category: "beer",
    description: "Flower Power 12oz bottle",
    id: "FLP12B",
    packaging: "bottle",
    price: "41.39",
    size: "12oz"
  },
  FLT12B: {
    brand: "New Belgium Flat Tire",
    category: "beer",
    description: "New Belgium Flat Tire 12oz bottle",
    id: "FLT12B",
    packaging: "bottle",
    price: "38.49",
    size: "12oz"
  },
  FLY12B: {
    brand: "Flying Dog",
    category: "beer",
    description: "Flying Dog 12oz bottle",
    id: "FLY12B",
    packaging: "bottle",
    price: "43.95",
    size: "12oz"
  },
  FOC12C: {
    brand: "Foco Coco",
    category: "juice",
    description: "Foco Coco 12oz can",
    id: "FOC12C",
    packaging: "can",
    price: "17.95",
    size: "12oz"
  },
  FOC18C: {
    brand: "Foco Coco",
    category: "juice",
    description: "Foco Coco 18oz can 12pk",
    id: "FOC18C",
    packaging: "can",
    price: "21.89",
    size: "18oz"
  },
  FOL24C: {
    brand: "Four Loco",
    category: "beer",
    description: "Four Loco 24oz can",
    id: "FOL24C",
    packaging: "can",
    price: "26.49",
    size: "24oz"
  },
  FOS12B: {
    brand: "Foster Lager",
    category: "beer",
    description: "Foster Lager 12oz bottle",
    id: "FOS12B",
    packaging: "bottle",
    price: "25.95",
    size: "12oz"
  },
  FOS25C: {
    brand: "Foster Lager",
    category: "beer",
    description: "Foster Lager 25oz can",
    id: "FOS25C",
    packaging: "can",
    price: "21.95",
    size: "25oz"
  },
  FOU12B: {
    brand: "Founders",
    category: "beer",
    description: "Founders 12oz bottle",
    id: "FOU12B",
    packaging: "bottle",
    price: "42.89",
    size: "12oz"
  },
  FRE12C: {
    brand: "Fresca",
    category: "soda",
    description: "Fresca 12oz can",
    id: "FRE12C",
    packaging: "can",
    price: "10.99",
    size: "12oz"
  },
  FRE20B: {
    brand: "Fresca",
    category: "soda",
    description: "Fresca 20oz bottle",
    id: "FRE20B",
    packaging: "bottle",
    price: "22.99",
    size: "20oz"
  },
  FRE2LI: {
    brand: "Fresca",
    category: "soda",
    description: "Fresca 2liter bottle",
    id: "FRE2LI",
    packaging: "bottle",
    price: "12.69",
    size: "2liter"
  },
  GAT20B: {
    brand: "Gatorade",
    category: "juice",
    description: "Gatorade 20oz bottle",
    flavors: ["fruit-punch", "orange", "lime", "cool blue"],
    id: "GAT20B",
    packaging: "bottle",
    price: "16.89",
    size: "20oz"
  },
  GAT32B: {
    brand: "Gatorade",
    category: "juice",
    description: "Gatorade 32oz bottle",
    flavors: ["fruit-punch", "orange", "lime", "cool blue"],
    id: "GAT32B",
    packaging: "bottle",
    price: "15.99",
    size: "32oz"
  },
  GBL12B: {
    brand: "Guiness Black Lager",
    category: "beer",
    description: "Guiness Black Lager 12oz bottle",
    id: "GBL12B",
    packaging: "bottle",
    price: "32.69",
    size: "12oz"
  },
  GFX12B: {
    brand: "Guiness Foreign Extra",
    category: "beer",
    description: "Guiness Foreign Extra 12oz bottle",
    id: "GFX12B",
    packaging: "bottle",
    price: "46.95",
    size: "12oz"
  },
  GOI12B: {
    brand: "Goose Island",
    category: "beer",
    description: "Goose Island 12oz bottle",
    id: "GOI12B",
    packaging: "bottle",
    price: "38.95",
    size: "12oz"
  },
  GOM12B: {
    brand: "Golden Monkey",
    category: "beer",
    description: "Golden Monkey 12oz bottle",
    id: "GOM12B",
    packaging: "bottle",
    price: "49.49",
    size: "12oz"
  },
  GOO12C: {
    brand: "Good-O",
    category: "soda",
    description: "Good-O 12oz can",
    id: "GOO12C",
    packaging: "can",
    price: "11.69",
    size: "12oz"
  },
  GOO20B: {
    brand: "Good-O",
    category: "soda",
    description: "Good-O 20oz bottle",
    id: "GOO20B",
    packaging: "bottle",
    price: "20.89",
    size: "20oz"
  },
  GOO2LI: {
    brand: "Good-O",
    category: "soda",
    description: "Good-O 2liter bottle",
    id: "GOO2LI",
    packaging: "bottle",
    price: "9.49",
    size: "2liter"
  },
  GRO12B: {
    brand: "Grolsh",
    category: "beer",
    description: "Grolsh 12oz bottle",
    id: "GRO12B",
    packaging: "bottle",
    price: "32.95",
    size: "12oz"
  },
  GRO16B: {
    brand: "Grolsh",
    category: "beer",
    description: "Grolsh 16oz bottle",
    id: "GRO16B",
    packaging: "bottle",
    price: "51.69",
    size: "16oz"
  },
  GUD12B: {
    brand: "Guiness Draft",
    category: "beer",
    description: "Guiness Draft 12oz bottle",
    id: "GUD12B",
    packaging: "bottle",
    price: "33.95",
    size: "12oz"
  },
  GUD12P: {
    brand: "Guiness Draft",
    category: "beer",
    description: "Guiness Draft 12oz bottle loose",
    id: "GUD12P",
    packaging: "bottle loose",
    price: "33.95",
    size: "12oz"
  },
  GUF12B: {
    brand: "Guiness Frontal",
    category: "beer",
    description: "Guiness Frontal 12oz bottle",
    id: "GUF12B",
    packaging: "bottle",
    price: "44.95",
    size: "12oz"
  },
  GUS12B: {
    brand: "Guiness Stout",
    category: "beer",
    description: "Guiness Stout 12oz bottle",
    id: "GUS12B",
    packaging: "bottle",
    price: "33.95",
    size: "12oz"
  },
  GUS12P: {
    brand: "Guiness Stout",
    category: "beer",
    description: "Guiness Stout 12oz bottle loose",
    id: "GUS12P",
    packaging: "bottle loose",
    price: "32.90",
    size: "12oz"
  },
  GUS15C: {
    brand: "Guiness Draft",
    category: "beer",
    description: "Guiness Draft 15oz can",
    id: "GUS15C",
    packaging: "can",
    price: "39.95",
    size: "15oz"
  },
  GUS22B: {
    brand: "Guiness Stout",
    category: "beer",
    description: "Guiness Stout 22oz bottle",
    id: "GUS22B",
    packaging: "bottle",
    price: "27.89",
    size: "22oz"
  },
  HAP12C: {
    brand: "Hawaiian Punch",
    category: "juice",
    description: "Hawaiian Punch 12oz can",
    id: "HAP12C",
    packaging: "can",
    price: "9.99",
    size: "12oz"
  },
  HAP1LI: {
    brand: "Hawaiian Punch",
    category: "juice",
    description: "Hawaiian Punch 1liter",
    id: "HAP1LI",
    packaging: "bottle",
    price: "13.95",
    size: "1liter"
  },
  HAP20B: {
    brand: "Hawaiian Punch",
    category: "juice",
    description: "Hawaiian Punch 20oz bottle",
    id: "HAP20B",
    packaging: "bottle",
    price: "18.89",
    size: "20oz"
  },
  HAP2LI: {
    brand: "Hawaiian Punch",
    category: "juice",
    description: "Hawaiian Punch 2liter",
    id: "HAP2LI",
    packaging: "bottle",
    price: "10.95",
    size: "2liter"
  },
  HAR12B: {
    brand: "Harpoon",
    category: "beer",
    description: "Harpoon 12oz bottle",
    id: "HAR12B",
    packaging: "bottle",
    price: "41.49",
    size: "12oz"
  },
  HDK12B: {
    brand: "Heineken Dark",
    category: "beer",
    description: "Heineken Dark 12oz bottle",
    id: "HDK12B",
    packaging: "bottle",
    price: "31.29",
    size: "12oz"
  },
  HEI12B: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 12oz bottle",
    id: "HEI12B",
    packaging: "bottle",
    price: "32.89",
    size: "12oz"
  },
  HEI12C: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 12oz can",
    id: "HEI12C",
    packaging: "can",
    price: "33.69",
    size: "12oz"
  },
  HEI12L: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 12oz can",
    id: "HEI12L",
    packaging: "can",
    price: "31.95",
    size: "12oz"
  },
  HEI12P: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 12oz bottle loose",
    id: "HEI12P",
    packaging: "bottle loose",
    price: "30.95",
    size: "12oz"
  },
  HEI16C: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 16oz can",
    id: "HEI16C",
    packaging: "can",
    price: "38.95",
    size: "16oz"
  },
  HEI22B: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 22oz bottle",
    id: "HEI22B",
    packaging: "bottle",
    price: "29.95",
    size: "22oz"
  },
  HEI24C: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 24oz can",
    id: "HEI24C",
    packaging: "can",
    price: "28.95",
    size: "24oz"
  },
  HEI7B: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 7oz bottle",
    id: "HEI7B",
    packaging: "bottle",
    price: "23.39",
    size: "7oz"
  },
  HEI8C: {
    brand: "Heineken",
    category: "beer",
    description: "Heineken 8oz can",
    id: "HEI8C",
    packaging: "can",
    price: "22.95",
    size: "8oz"
  },
  HEX12B: {
    brand: "Heineken Lite",
    category: "beer",
    description: "Heineken Lite 12oz bottle",
    id: "HEX12B",
    packaging: "bottle",
    price: "32.89",
    size: "12oz"
  },
  HEX22B: {
    brand: "Heineken Lite",
    category: "beer",
    description: "Heineken Lite 22oz bottle",
    id: "HEX22B",
    packaging: "bottle",
    price: "28.95",
    size: "22oz"
  },
  HOE12B: {
    brand: "Hoegarden",
    category: "beer",
    description: "Hoegarden 12oz bottle",
    id: "HOE12B",
    packaging: "bottle",
    price: "35.95",
    size: "12oz"
  },
  HOM12B: {
    brand: "Honeymoon",
    category: "beer",
    description: "Honeymoon 12oz bottle",
    id: "HOM12B",
    packaging: "bottle",
    price: "28.99",
    size: "12oz"
  },
  HUR16C: {
    brand: "Hurricane",
    category: "beer",
    description: "Hurricane 16oz can",
    id: "HUR16C",
    packaging: "can",
    price: "15.49",
    size: "16oz"
  },
  HUR40B: {
    brand: "Hurricane",
    category: "beer",
    description: "Hurricane 40oz bottle",
    id: "HUR40B",
    packaging: "bottle",
    price: "19.65",
    size: "40oz"
  },
  IMP12B: {
    brand: "Imperial",
    category: "beer",
    description: "Imperial 12oz bottle",
    id: "IMP12B",
    packaging: "bottle",
    price: "28.39",
    size: "12oz"
  },
  INC20B: {
    brand: "Inca Cola",
    category: "soda",
    description: "Inca Cola 20oz bottle",
    id: "INC20B",
    packaging: "bottle",
    price: "14.99",
    size: "20oz"
  },
  IND12B: {
    brand: "Malta India",
    category: "soda",
    description: "Malta India 12oz bottle",
    id: "IND12B",
    packaging: "bottle",
    price: "17.39",
    size: "12oz"
  },
  IND7B: {
    brand: "Malta India",
    category: "soda",
    description: "Malta India 7oz bottle",
    id: "IND7B",
    packaging: "bottle",
    price: "16.39",
    size: "7oz"
  },
  IPA12B: {
    brand: "60 Minutes IPA",
    category: "beer",
    description: "60 Minutes IPA 12oz bottle",
    id: "IPA12B",
    packaging: "bottle",
    price: "41.95",
    size: "12oz"
  },
  JAR12B: {
    brand: "Jarritos",
    category: "soda",
    description: "Jarritos 12oz bottle",
    flavors: ["frambuesa", "orange", "tamarindo"],
    id: "JAR12B",
    packaging: "bottle",
    price: "20.99",
    size: "12oz"
  },
  JAR2L1: {
    brand: "Jarritos",
    category: "soda",
    description: "Jarritos 1liter",
    flavors: ["frambuesa", "orange", "tamarindo"],
    id: "JAR2L1",
    packaging: "bottle",
    price: "12.69",
    size: "1liter"
  },
  JOO24C: {
    brand: "Joose",
    category: "energy drink",
    description: "Joose 24oz can",
    id: "JOO24C",
    packaging: "can",
    price: "24.69",
    size: "24oz"
  },
  KEY24C: {
    brand: "Keystone",
    category: "beer",
    description: "Keystone 24oz can",
    id: "KEY24C",
    packaging: "can",
    price: "15.99",
    size: "24oz"
  },
  KIC16C: {
    brand: "King Cobra",
    category: "beer",
    description: "King C{16oz can",
    id: "KIC16C",
    packaging: "can",
    price: "16.95",
    size: "16oz"
  },
  KIC24C: {
    brand: "King Cobra",
    category: "beer",
    description: "King C{24oz can",
    id: "KIC24C",
    packaging: "can",
    price: "17.39",
    size: "24oz"
  },
  KOL6B: {
    brand: "Koolaid Jammers",
    category: "juice",
    description: "Koolaid Jammers 6oz pouches",
    id: "KOL6B",
    packaging: "pouch",
    price: "9.95",
    size: "6oz"
  },
  KRO12B: {
    brand: "Kroenbourg",
    category: "beer",
    description: "Kroenbourg 12oz bottle",
    id: "KRO12B",
    packaging: "bottle",
    price: "34.95",
    size: "12oz"
  },
  LAG12B: {
    brand: "Lagunitas",
    category: "beer",
    description: "Lagunitas 12oz bottle",
    id: "LAG12B",
    packaging: "bottle",
    price: "39.95",
    size: "12oz"
  },
  LEF11B: {
    brand: "Leffe",
    category: "beer",
    description: "Leffe 11oz bottle",
    id: "LEF11B",
    packaging: "bottle",
    price: "37.99",
    size: "11oz"
  },
  LIP12C: {
    brand: "Lipton Iced Tea",
    category: "juice",
    description: "Lipton Iced Tea 12oz can",
    id: "LIP12C",
    packaging: "can",
    price: "10.95",
    size: "12oz"
  },
  LIP20B: {
    brand: "Lipton Iced Tea",
    category: "juice",
    description: "Lipton Iced Tea 20oz bottle",
    id: "LIP20B",
    packaging: "bottle",
    price: "19.49",
    size: "20oz"
  },
  LIP2LI: {
    brand: "Lipton Iced Tea",
    category: "juice",
    description: "Lipton Iced Tea 2liter",
    id: "LIP2LI",
    packaging: "bottle",
    price: "12.95",
    size: "2liter"
  },
  LOW12B: {
    brand: "Lowenbrau",
    category: "beer",
    description: "Lowenbrau 12oz bottle",
    id: "LOW12B",
    packaging: "bottle",
    price: "29.39",
    size: "12oz"
  },
  LOW12P: {
    brand: "Lowenbrau",
    category: "beer",
    description: "Lowenbrau 12oz bottle loose",
    id: "LOW12P",
    packaging: "bottle loose",
    price: "28.95",
    size: "12oz"
  },
  MAG12B: {
    brand: "Magners",
    category: "beer",
    description: "Magners 12oz bottle",
    id: "MAG12B",
    packaging: "bottle",
    price: "36.99",
    size: "12oz"
  },
  MAT12B: {
    brand: "Malta Tiegre",
    category: "soda",
    description: "Malta Tiegre 12oz bottle",
    id: "MAT12B",
    packaging: "bottle",
    price: "39.49",
    size: "12oz"
  },
  MCH24C: {
    brand: "Modele Chelada",
    category: "beer",
    description: "Modele Chelada 24oz can",
    id: "MCH24C",
    packaging: "can",
    price: "33.95",
    size: "24oz"
  },
  MDR12B: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 12oz bottle",
    id: "MDR12B",
    packaging: "bottle",
    price: "26.49",
    size: "12oz"
  },
  MDR12C: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 12oz can",
    id: "MDR12C",
    packaging: "can",
    price: "18.95",
    size: "12oz"
  },
  MDR12P: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 12oz bottle loose",
    id: "MDR12P",
    packaging: "bottle loose",
    price: "15.69",
    size: "12oz"
  },
  MDR16C: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 16oz can",
    id: "MDR16C",
    packaging: "can",
    price: "29.95",
    size: "16oz"
  },
  MDR22B: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 22oz bottle",
    id: "MDR22B",
    packaging: "bottle",
    price: "20.69",
    size: "22oz"
  },
  MDR24C: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 24oz can",
    id: "MDR24C",
    packaging: "can",
    price: "21.95",
    size: "24oz"
  },
  MDR30C: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 30oz can",
    id: "MDR30C",
    packaging: "can",
    price: "20.39",
    size: "30oz"
  },
  MDR40B: {
    brand: "Miller Draft",
    category: "beer",
    description: "Miller Draft 40oz bottle",
    id: "MDR40B",
    packaging: "bottle",
    price: "32.95",
    size: "40oz"
  },
  MHL12B: {
    brand: "Mike's Hard Asst.",
    category: "beer",
    description: "Mike's Hard Asst. 12oz bottle",
    flavors: ["black cherry", "lemon", "cranberry", "mango"],
    id: "MHL12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  MHL22B: {
    brand: "Mike's Hard Asst.",
    category: "beer",
    description: "Mike's Hard Asst. 22oz bottle",
    flavors: ["black cherry", "lemon", "cranberry", "mango"],
    id: "MHL22B",
    packaging: "bottle",
    price: "29.89",
    size: "22oz"
  },
  MHL24C: {
    brand: "Mike's Hard Asst.",
    category: "beer",
    description: "Mike's Hard Asst. 24oz can",
    flavors: ["black cherry", "lemon", "cranberry", "mango"],
    id: "MHL24C",
    packaging: "can",
    price: "29.89",
    size: "24oz"
  },
  MHS12B: {
    brand: "Magic Hat Assorted",
    category: "beer",
    description: "Magic Hat Assorted 12oz bottle",
    id: "MHS12B",
    packaging: "bottle",
    price: "34.95",
    size: "12oz"
  },
  MIC12B: {
    brand: "Michelob",
    category: "beer",
    description: "Michelob 12oz bottle",
    id: "MIC12B",
    packaging: "bottle",
    price: "32.49",
    size: "12oz"
  },
  MIC12P: {
    brand: "Michelob",
    category: "beer",
    description: "Michelob 12oz bottle loose",
    id: "MIC12P",
    packaging: "bottle loose",
    price: "27.95",
    size: "12oz"
  },
  MIL12B: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 12oz bottle",
    id: "MIL12B",
    packaging: "bottle",
    price: "24.69",
    size: "12oz"
  },
  MIL12C: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 12oz can",
    id: "MIL12C",
    packaging: "can",
    price: "16.99",
    size: "12oz"
  },
  MIL12P: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 12oz bottle loose",
    id: "MIL12P",
    packaging: "bottle loose",
    price: "18.95",
    size: "12oz"
  },
  MIL16C: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 16oz can",
    id: "MIL16C",
    packaging: "can",
    price: "30.95",
    size: "16oz"
  },
  MIL22B: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 22oz bottle",
    id: "MIL22B",
    packaging: "bottle",
    price: "24.95",
    size: "22oz"
  },
  MIL24C: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 24oz can",
    id: "MIL24C",
    packaging: "can",
    price: "21.89",
    size: "24oz"
  },
  MIL30C: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 12oz can 30pk",
    id: "MIL30C",
    packaging: "can",
    price: "22.39",
    size: "12oz"
  },
  MIL40B: {
    brand: "Miller High Life",
    category: "beer",
    description: "Miller High Life 40oz bottle",
    id: "MIL40B",
    packaging: "bottle",
    price: "32.95",
    size: "40oz"
  },
  MIN20B: {
    brand: "Minute Maid",
    category: "juice",
    description: "Minute Maid 20oz bottle",
    id: "MIN20B",
    packaging: "bottle",
    price: "21.95",
    size: "20oz"
  },
  MIS20B: {
    brand: "Mist Natural",
    category: "soda",
    description: "Mist Natural 20oz bottle",
    id: "MIS20B",
    packaging: "bottle",
    price: "19.95",
    size: "20oz"
  },
  MIT12B: {
    brand: "Mithos",
    category: "beer",
    description: "Mithos 12oz bottle",
    id: "MIT12B",
    packaging: "bottle",
    price: "28.95",
    size: "12oz"
  },
  MIX12B: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 12oz bottle",
    id: "MIX12B",
    packaging: "bottle",
    price: "26.49",
    size: "12oz"
  },
  MIX12C: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 12oz can",
    id: "MIX12C",
    packaging: "can",
    price: "16.99",
    size: "12oz"
  },
  MIX12P: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 12oz bottle loose",
    id: "MIX12P",
    packaging: "bottle loose",
    price: "17.99",
    size: "12oz"
  },
  MIX16C: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 16oz can",
    id: "MIX16C",
    packaging: "can",
    price: "30.95",
    size: "16oz"
  },
  MIX18B: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 18oz bottle",
    id: "MIX18B",
    packaging: "bottle",
    price: "13.49",
    size: "18oz"
  },
  MIX22B: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 22oz bottle",
    id: "MIX22B",
    packaging: "bottle",
    price: "20.69",
    size: "22oz"
  },
  MIX24C: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 24oz can",
    id: "MIX24C",
    packaging: "can",
    price: "22.95",
    size: "24oz"
  },
  MIX30C: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 12oz can 30pk",
    id: "MIX30C",
    packaging: "can",
    price: "20.69",
    size: "12oz"
  },
  MIX36C: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite can",
    id: "MIX36C",
    packaging: "can",
    price: "24.49",
    size: "16oz"
  },
  MIX40B: {
    brand: "Miller Lite",
    category: "beer",
    description: "Miller Lite 40oz bottle",
    id: "MIX40B",
    packaging: "bottle",
    price: "32.95",
    size: "40oz"
  },
  MLC24C: {
    brand: "Miller Champagne",
    category: "beer",
    description: "Miller Champagne 24oz can",
    id: "MLC24C",
    packaging: "can",
    price: "23.49",
    size: "24oz"
  },
  MOE12P: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 12oz bottle loose",
    id: "MOE12P",
    packaging: "bottle loose",
    price: "29.49",
    size: "12oz"
  },
  MOG12B: {
    brand: "Molson Golden",
    category: "beer",
    description: "Molson Golden 12oz bottle",
    id: "MOG12B",
    packaging: "bottle",
    price: "25.49",
    size: "12oz"
  },
  MOI12B: {
    brand: "Molson Ice",
    category: "beer",
    description: "Molson Ice 12oz bottle",
    id: "MOI12B",
    packaging: "bottle",
    price: "25.49",
    size: "12oz"
  },
  MON16C: {
    brand: "Monster",
    category: "energy drink",
    description: "Monster 16oz can",
    id: "MON16C",
    packaging: "can",
    price: "34.89",
    size: "16oz"
  },
  MOR10B: {
    brand: "Moretti",
    category: "energy drink",
    description: "Moretti 10oz bottle",
    id: "MOR10B",
    packaging: "bottle",
    price: "29.95",
    size: "10oz"
  },
  MOR12B: {
    brand: "Moretti",
    category: "beer",
    description: "Moretti 12oz bottle",
    id: "MOR12B",
    packaging: "bottle",
    price: "35.49",
    size: "12oz"
  },
  MOS12B: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 12oz bottle",
    id: "MOS12B",
    packaging: "bottle",
    price: "33.39",
    size: "12oz"
  },
  MOS12C: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 12oz can",
    id: "MOS12C",
    packaging: "can",
    price: "29.95",
    size: "12oz"
  },
  MOS12P: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 12oz bottle loose",
    id: "MOS12P",
    packaging: "bottle loose",
    price: "31.95",
    size: "12oz"
  },
  MOS16B: {
    brand: "Moskato",
    category: "beer",
    description: "Moskato 16oz bottle",
    id: "MOS16B",
    packaging: "bottle",
    price: "30.95",
    size: "16oz"
  },
  MOS22B: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 22oz bottle",
    id: "MOS22B",
    packaging: "bottle",
    price: "30.95",
    size: "22oz"
  },
  MOS24B: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 24oz bottle",
    id: "MOS24B",
    packaging: "bottle",
    price: "30.49",
    size: "24oz"
  },
  MOS24C: {
    brand: "Modelo Especial",
    category: "beer",
    description: "Modelo Especial 24oz can",
    id: "MOS24C",
    packaging: "can",
    price: "30.89",
    size: "24oz"
  },
  MOS32B: {
    brand: "Modelo",
    category: "beer",
    description: "Modelo 32oz bottle",
    id: "MOS32B",
    packaging: "bottle",
    price: "39.95",
    size: "32oz"
  },
  MTD12C: {
    brand: "Mountain Dew",
    category: "soda",
    description: "Mountain Dew 12oz can",
    id: "MTD12C",
    packaging: "can",
    price: "12.79",
    size: "12oz"
  },
  MTD1LI: {
    brand: "Mountain Dew",
    category: "soda",
    description: "Mountain Dew 1liter",
    id: "MTD1LI",
    packaging: "bottle",
    price: "16.89",
    size: "1liter"
  },
  MTD20B: {
    brand: "Mountain Dew",
    category: "soda",
    description: "Mountain Dew 20oz bottle",
    id: "MTD20B",
    packaging: "bottle",
    price: "23.95",
    size: "20oz"
  },
  MTD2LI: {
    brand: "Mountain Dew",
    category: "soda",
    description: "Mountain Dew 2liter",
    id: "MTD2LI",
    packaging: "bottle",
    price: "12.95",
    size: "2liter"
  },
  MTH12P: {
    brand: "Mythos",
    category: "beer",
    description: "Mythos 12oz bottle loose",
    id: "MTH12P",
    packaging: "bottle loose",
    price: "36.99",
    size: "12oz"
  },
  MUG12C: {
    brand: "Mug",
    category: "soda",
    description: "Mug 12oz can",
    id: "MUG12C",
    packaging: "can",
    price: "11.39",
    size: "12oz"
  },
  MUG20B: {
    brand: "Mug",
    category: "soda",
    description: "Mug 20oz bottle",
    id: "MUG20B",
    packaging: "bottle",
    price: "22.89",
    size: "20oz"
  },
  MUG2LI: {
    brand: "Mug",
    category: "soda",
    description: "Mug 2liter",
    id: "MUG2LI",
    packaging: "bottle",
    price: "12.19",
    size: "2liter"
  },
  MUM16B: {
    brand: "Muscle Milk",
    category: "fitness",
    description: "Muscle Milk 16oz bottle",
    flavors: ["vanilla", "chocolate", "bannana", "strawberry"],
    id: "MUM16B",
    packaging: "bottle",
    price: "28.99",
    size: "16oz"
  },
  MYC16B: {
    brand: "Mystic Carrot",
    category: "juice",
    description: "Mystic Carrot 16oz bottle",
    id: "MYC16B",
    packaging: "bottle",
    price: "10.99",
    size: "16oz"
  },
  MYS16B: {
    brand: "Mystic Juices",
    category: "juice",
    description: "Mystic Juices 16oz bottle",
    id: "MYS16B",
    packaging: "bottle",
    price: "19.89",
    size: "16oz"
  },
  MYT12B: {
    brand: "Mythos",
    category: "beer",
    description: "Mythos 12oz bottle",
    id: "MYT12B",
    packaging: "bottle",
    price: "36.99",
    size: "12oz"
  },
  MYT16B: {
    brand: "Mystic Tropical",
    category: "juice",
    description: "Mystic Tropical 16oz bottle",
    id: "MYT16B",
    packaging: "bottle",
    price: "19.89",
    size: "16oz"
  },
  NAX12C: {
    brand: "Natural Lite",
    category: "beer",
    description: "Natural Lite 12oz can",
    id: "NAX12C",
    packaging: "can",
    price: "16.89",
    size: "12oz"
  },
  NAX16C: {
    brand: "Natural Lite",
    category: "beer",
    description: "Natural Lite 16oz can",
    id: "NAX16C",
    packaging: "can",
    price: "23.69",
    size: "16oz"
  },
  NAX22B: {
    brand: "Natural Lite",
    category: "beer",
    description: "Natural Lite 22oz bottle",
    id: "NAX22B",
    packaging: "bottle",
    price: "18.99",
    size: "22oz"
  },
  NAX24C: {
    brand: "Natural Lite",
    category: "beer",
    description: "Natural Lite 24oz can",
    id: "NAX24C",
    packaging: "can",
    price: "17.69",
    size: "24oz"
  },
  NAX30C: {
    brand: "Natural Lite",
    category: "beer",
    description: "Natural Lite 12oz can 30pk",
    id: "NAX30C",
    packaging: "can",
    price: "18.99",
    size: "12oz"
  },
  NAX36C: {
    brand: "Natural Lite",
    category: "beer",
    description: "Natural Lite 12oz can 36pk",
    id: "NAX36C",
    packaging: "can",
    price: "18.99",
    size: "12oz"
  },
  NEB12B: {
    brand: "New Belgium",
    category: "beer",
    description: "New Belgium 12oz bottle",
    id: "NEB12B",
    packaging: "bottle",
    price: "38.49",
    size: "12oz"
  },
  NEC12B: {
    brand: "New Castle",
    category: "beer",
    description: "New Castle 12oz bottle",
    id: "NEC12B",
    packaging: "bottle",
    price: "33.95",
    size: "12oz"
  },
  NEM12B: {
    brand: "Negra Modelo",
    category: "beer",
    description: "Negra Modelo 12oz bottle",
    id: "NEM12B",
    packaging: "bottle",
    price: "33.69",
    size: "12oz"
  },
  NEM12P: {
    brand: "Negra Modelo",
    category: "beer",
    description: "Negra Modelo 12oz bottle loose",
    id: "NEM12P",
    packaging: "bottle loose",
    price: "29.95",
    size: "12oz"
  },
  NEQ16B: {
    brand: "Nesquik",
    category: "dairy",
    description: "Nesquik 16oz bottle",
    flavors: ["vanilla", "chocolate", "bannana", "strawberry"],
    id: "NEQ16B",
    packaging: "bottle",
    price: "17.49",
    size: "16oz"
  },
  NES12C: {
    brand: "Nestea Iced Tea",
    category: "juice",
    description: "Nestea Iced Tea 12oz can",
    id: "NES12C",
    packaging: "can",
    price: "10.49",
    size: "12oz"
  },
  NES20B: {
    brand: "Nestea Iced Tea",
    category: "juice",
    description: "Nestea Iced Tea 20oz bottle",
    id: "NES20B",
    packaging: "bottle",
    price: "21.45",
    size: "20oz"
  },
  NES2LI: {
    brand: "Nestea Iced Tea",
    category: "juice",
    description: "Nestea Iced Tea 2liter bottle",
    id: "NES2LI",
    packaging: "bottle",
    price: "13.99",
    size: "2liter"
  },
  NIR16B: {
    brand: "Nirvana",
    category: "beer",
    description: "Nirvana 16oz bottle",
    id: "NIR16B",
    packaging: "bottle",
    price: "4.99",
    size: "16oz"
  },
  NUT12C: {
    brand: "Nutrament",
    category: "dairy",
    description: "Nutrament 12oz can",
    id: "NUT12C",
    packaging: "can",
    price: "17.89",
    size: "12oz"
  },
  OCE16B: {
    brand: "Oceanspray",
    category: "juice",
    description: "Oceanspray 16oz bottle",
    id: "OCE16B",
    packaging: "bottle",
    price: "11.95",
    size: "16oz"
  },
  OCE32B: {
    brand: "Oceanspray",
    category: "juice",
    description: "Oceanspray 32oz bottle",
    id: "OCE32B",
    packaging: "bottle",
    price: "11.99",
    size: "32oz"
  },
  OCE64B: {
    brand: "Oceanspray",
    category: "juice",
    description: "Oceanspray 64oz bottle",
    id: "OCE64B",
    packaging: "bottle",
    price: "23.69",
    size: "64oz"
  },
  ODO12B: {
    brand: "Odoul's Non Alcohol",
    category: "beer",
    description: "Odoul's Non Alcohol 12oz bottle",
    id: "ODO12B",
    packaging: "bottle",
    price: "32.69",
    size: "12oz"
  },
  OLE12C: {
    brand: "Olde English",
    category: "beer",
    description: "Olde English 12oz can",
    id: "OLE12C",
    packaging: "can",
    price: "16.05",
    size: "12oz"
  },
  OLE16C: {
    brand: "Olde English",
    category: "beer",
    description: "Olde English 16oz can",
    id: "OLE16C",
    packaging: "can",
    price: "19.49",
    size: "16oz"
  },
  OLE22B: {
    brand: "Olde English",
    category: "beer",
    description: "Olde English 22oz bottle",
    id: "OLE22B",
    packaging: "bottle",
    price: "18.89",
    size: "22oz"
  },
  OLE24C: {
    brand: "Olde English",
    category: "beer",
    description: "Olde English 24oz can",
    id: "OLE24C",
    packaging: "can",
    price: "16.95",
    size: "24oz"
  },
  OLE40B: {
    brand: "Ole Tyme",
    category: "beer",
    description: "Ole Tyme 40oz bottle",
    id: "OLE40B",
    packaging: "bottle",
    price: "23.69",
    size: "40oz"
  },
  OLT16B: {
    brand: "Ole Tyme",
    category: "beer",
    description: "Ole Tyme 16oz bottle",
    id: "OLT16B",
    packaging: "bottle",
    price: "11.49",
    size: "16oz"
  },
  OLT20B: {
    brand: "Ole Tyme",
    category: "beer",
    description: "Ole Tyme 20oz bottle",
    id: "OLT20B",
    packaging: "bottle",
    price: "10.95",
    size: "20oz"
  },
  ORA10B: {
    brand: "Orangina",
    category: "juice",
    description: "Orangina 10oz bottle",
    id: "ORA10B",
    packaging: "bottle",
    price: "20.95",
    size: "10oz"
  },
  ORA16B: {
    brand: "Orangina",
    category: "juice",
    description: "Orangina 16oz bottle",
    id: "ORA16B",
    packaging: "bottle",
    price: "20.95",
    size: "16oz"
  },
  PAB10B: {
    brand: "Parrot Bay",
    category: "beer",
    description: "Parrot Bay 10oz bottle",
    id: "PAB10B",
    packaging: "bottle",
    price: "43.95",
    size: "10oz"
  },
  PAB16C: {
    brand: "Parrot Bay",
    category: "beer",
    description: "Parrot Bay 16oz can",
    id: "PAB16C",
    packaging: "can",
    price: "34.39",
    size: "16oz"
  },
  PAC12B: {
    brand: "Pacifico",
    category: "beer",
    description: "Pacifico 12oz bottle",
    id: "PAC12B",
    packaging: "bottle",
    price: "34.95",
    size: "12oz"
  },
  PAC24C: {
    brand: "Pacifico",
    category: "beer",
    description: "Pacifico 24oz can",
    id: "PAC24C",
    packaging: "can",
    price: "31.95",
    size: "24oz"
  },
  PAL12B: {
    brand: "Palm",
    category: "beer",
    description: "Palm 12oz bottle",
    id: "PAL12B",
    packaging: "bottle",
    price: "36.89",
    size: "12oz"
  },
  PBR12C: {
    brand: "Pabst Blue Ribbon",
    category: "beer",
    description: "Pabst Blue Ribbon 12oz can",
    id: "PBR12C",
    packaging: "can",
    price: "18.69",
    size: "12oz"
  },
  PBR16C: {
    brand: "Pabst Blue Ribbon",
    category: "beer",
    description: "Pabst Blue Ribbon 16oz can",
    id: "PBR16C",
    packaging: "can",
    price: "22.39",
    size: "16oz"
  },
  PBR24C: {
    brand: "Pabst Blue Ribbon",
    category: "beer",
    description: "Pabst Blue Ribbon 24oz can",
    id: "PBR24C",
    packaging: "can",
    price: "17.95",
    size: "24oz"
  },
  PED6B: {
    brand: "Pediasure",
    category: "dairy",
    description: "Pediasure 60oz bottle",
    id: "PED6B",
    packaging: "bottle",
    price: "38.99",
    size: "60oz"
  },
  PEL12C: {
    brand: "Pellegrino",
    category: "water",
    description: "Pellegrino 12oz can",
    id: "PEL12C",
    packaging: "can",
    price: "21.95",
    size: "12oz"
  },
  PEL25B: {
    brand: "Pellegrino",
    category: "water",
    description: "Pellegrino 25oz bottle",
    id: "PEL25B",
    packaging: "bottle",
    price: "22.95",
    size: "25oz"
  },
  PEL8B: {
    brand: "Pellegrino",
    category: "water",
    description: "Pellegrino 8oz bottle",
    id: "PEL8B",
    packaging: "bottle",
    price: "19.39",
    size: "8oz"
  },
  PEL8C: {
    brand: "Pellegrino",
    category: "water",
    description: "Pellegrino 8oz can",
    id: "PEL8C",
    packaging: "can",
    price: "16.95",
    size: "8oz"
  },
  PEO12B: {
    brand: "Peak Organic",
    category: "beer",
    description: "Peak Organic 12oz bottle",
    id: "PEO12B",
    packaging: "bottle",
    price: "38.69",
    size: "12oz"
  },
  PEP10B: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 10oz bottle",
    id: "PEP10B",
    packaging: "bottle",
    price: "18.89",
    size: "10oz"
  },
  PEP12C: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 12oz can",
    id: "PEP12C",
    packaging: "can",
    price: "12.49",
    size: "12oz"
  },
  PEP1LI: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 1liter",
    id: "PEP1LI",
    packaging: "bottle",
    price: "18.95",
    size: "1liter"
  },
  PEP20B: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 20oz bottle",
    id: "PEP20B",
    packaging: "bottle",
    price: "23.99",
    size: "20oz"
  },
  PEP2LI: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 2liter",
    id: "PEP2LI",
    packaging: "bottle",
    price: "12.89",
    size: "2liter"
  },
  PEP3LI: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 3liter bottle",
    id: "PEP3LI",
    packaging: "bottle",
    price: "12.39",
    size: "3liter"
  },
  PEP8B: {
    brand: "Pepsi",
    category: "soda",
    description: "Pepsi 8oz bottle",
    id: "PEP8B",
    packaging: "bottle",
    price: "14.15",
    size: "8oz"
  },
  PER11B: {
    brand: "Perrier",
    category: "water",
    description: "Perrier 11oz bottle",
    id: "PER11B",
    packaging: "bottle",
    price: "17.95",
    size: "11oz"
  },
  PER12B: {
    brand: "Peroni",
    category: "beer",
    description: "Peroni 12oz bottle",
    id: "PER12B",
    packaging: "bottle",
    price: "33.44",
    size: "12oz"
  },
  PER12P: {
    brand: "Peroni",
    category: "beer",
    description: "Peroni 12oz bottle loose",
    id: "PER12P",
    packaging: "bottle loose",
    price: "31.49",
    size: "12oz"
  },
  PER16B: {
    brand: "Peroni",
    category: "beer",
    description: "Peroni 16oz bottle",
    id: "PER16B",
    packaging: "bottle",
    price: "23.95",
    size: "16oz"
  },
  PER25B: {
    brand: "Peroni",
    category: "beer",
    description: "Peroni 25oz bottle",
    id: "PER25B",
    packaging: "bottle",
    price: "18.99",
    size: "25oz"
  },
  PER6B: {
    brand: "Peroni",
    category: "beer",
    description: "Peroni 6oz bottle",
    id: "PER6B",
    packaging: "bottle",
    price: "16.99",
    size: "6oz"
  },
  PIU12B: {
    brand: "Pilsner Uriquel",
    category: "beer",
    description: "Pilsner Uriquel 12oz bottle",
    id: "PIU12B",
    packaging: "bottle",
    price: "33.99",
    size: "12oz"
  },
  "POL1.5": {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 12/50.7 OZ",
    id: "POL1.5",
    packaging: "bottle",
    price: "9.89",
    size: "8oz"
  },
  POL16B: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 16oz bottle",
    id: "POL16B",
    packaging: "bottle",
    price: "9.69",
    size: "16oz"
  },
  POL1GA: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 1 gallon",
    id: "POL1GA",
    packaging: "bottle",
    price: "7.69",
    size: "1 gallon"
  },
  POL1LI: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 1liter",
    id: "POL1LI",
    packaging: "bottle",
    price: "9.29",
    size: "1liter"
  },
  POL24B: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 24oz bottle",
    id: "POL24B",
    packaging: "bottle",
    price: "9.49",
    size: "24oz"
  },
  POL24P: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 24oz bottle loose",
    id: "POL24P",
    packaging: "bottle loose",
    price: "6.39",
    size: "24oz"
  },
  POL40B: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 16oz bottle",
    id: "POL40B",
    packaging: "bottle",
    price: "8.99",
    size: "16oz"
  },
  POL8B: {
    brand: "Poland Spring",
    category: "water",
    description: "Poland Spring 8oz bottle",
    id: "POL8B",
    packaging: "bottle",
    price: "14.95",
    size: "8oz"
  },
  POW20B: {
    brand: "Powerade",
    category: "juice",
    description: "Powerade 20oz bottle",
    id: "POW20B",
    packaging: "bottle",
    price: "15.39",
    size: "20oz"
  },
  PRE12B: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 12oz bottle",
    id: "PRE12B",
    packaging: "bottle",
    price: "30.95",
    size: "12oz"
  },
  PRE12P: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 12oz bottle loose",
    id: "PRE12P",
    packaging: "bottle loose",
    price: "26.99",
    size: "12oz"
  },
  PRE1LI: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 1liter",
    id: "PRE1LI",
    packaging: "bottle",
    price: "34.89",
    size: "1liter"
  },
  PRE22B: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 22oz bottle",
    id: "PRE22B",
    packaging: "bottle",
    price: "29.49",
    size: "22oz"
  },
  PRE32B: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 32oz bottle",
    id: "PRE32B",
    packaging: "bottle",
    price: "34.95",
    size: "32oz"
  },
  PRX12B: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 12oz bottle",
    id: "PRX12B",
    packaging: "bottle",
    price: "29.95",
    size: "12oz"
  },
  PRX12P: {
    brand: "Presidente Lite",
    category: "beer",
    description: "Presidente Lite 12oz bottle loose",
    id: "PRX12P",
    packaging: "bottle loose",
    price: "26.49",
    size: "12oz"
  },
  RAC12B: {
    brand: "Racer #5 IPA",
    category: "beer",
    description: "Racer #5 IPA 12oz bottle",
    id: "RAC12B",
    packaging: "bottle",
    price: "41.95",
    size: "12oz"
  },
  RCC11B: {
    brand: "Rica",
    category: "juice",
    description: "Rica bottle 11oz bottle",
    id: "RCC11B",
    packaging: "bottle",
    price: "14.89",
    size: "11oz"
  },
  RCC16B: {
    brand: "Rica",
    category: "juice",
    description: "Rica 16oz bottle",
    id: "RCC16B",
    packaging: "bottle",
    price: "14.89",
    size: "16oz"
  },
  RCC6B: {
    brand: "Rica",
    category: "juice",
    description: "Rica 6oz bottle",
    id: "RCC6B",
    packaging: "bottle",
    price: "14.89",
    size: "6oz"
  },
  RDB12C: {
    brand: "Red Bull",
    category: "soda",
    description: "Red Bull 12oz can",
    id: "RDB12C",
    packaging: "can",
    price: "49.89",
    size: "12oz"
  },
  RDB16C: {
    brand: "Red Bull",
    category: "soda",
    description: "Red Bull 16oz can",
    id: "RDB16C",
    packaging: "can",
    price: "34.95",
    size: "16oz"
  },
  RDB8C: {
    brand: "Red Bull",
    category: "soda",
    description: "Red Bull 8oz can",
    id: "RDB8C",
    packaging: "can",
    price: "33.49",
    size: "8oz"
  },
  REA12B: {
    brand: "Red Apple",
    category: "beer",
    description: "Red Apple 12oz bottle",
    id: "REA12B",
    packaging: "bottle",
    price: "33.89",
    size: "12oz"
  },
  RES12B: {
    brand: "Red Stripe",
    category: "beer",
    description: "Red Stripe 12oz bottle",
    id: "RES12B",
    packaging: "bottle",
    price: "30.95",
    size: "12oz"
  },
  RES12P: {
    brand: "Red Stripe",
    category: "beer",
    description: "Red Stripe 12oz bottle loose",
    id: "RES12P",
    packaging: "bottle loose",
    price: "25.49",
    size: "12oz"
  },
  RES22B: {
    brand: "Red Stripe",
    category: "beer",
    description: "Red Stripe 22oz bottle",
    id: "RES22B",
    packaging: "bottle",
    price: "27.95",
    size: "22oz"
  },
  RIC11B: {
    brand: "Rica",
    category: "juice",
    description: "Rica 11oz bottle",
    id: "RIC11B",
    packaging: "bottle",
    price: "15.99",
    size: "11oz"
  },
  RIC16B: {
    brand: "Rica",
    category: "juice",
    description: "Rica 16oz bottle",
    id: "RIC16B",
    packaging: "bottle",
    price: "21.95",
    size: "16oz"
  },
  RIC1LI: {
    brand: "Rica",
    category: "juice",
    description: "Rica 1liter",
    id: "RIC1LI",
    packaging: "bottle",
    price: "26.49",
    size: "1liter"
  },
  RIC33B: {
    brand: "Rica",
    category: "juice",
    description: "Rica 33oz bottle",
    id: "RIC33B",
    packaging: "bottle",
    price: "16.95",
    size: "33oz"
  },
  RICA6B: {
    brand: "Rica",
    category: "juice",
    description: "Rica 6oz 27pk bottle",
    id: "RICA6B",
    packaging: "bottle",
    price: "21.89",
    size: "6oz"
  },
  RIV12B: {
    brand: "River Horse Triple",
    category: "beer",
    description: "River Horse Triple 12oz bottle",
    id: "RIV12B",
    packaging: "bottle",
    price: "52.69",
    size: "12oz"
  },
  ROR12B: {
    brand: "Rolling Rock",
    category: "beer",
    description: "Rolling Rock 12oz bottle",
    id: "ROR12B",
    packaging: "bottle",
    price: "26.49",
    size: "12oz"
  },
  ROR16C: {
    brand: "Rolling Rock",
    category: "beer",
    description: "Rolling Rock 16oz can",
    id: "ROR16C",
    packaging: "can",
    price: "29.39",
    size: "16oz"
  },
  ROR24C: {
    brand: "Rolling Rock",
    category: "beer",
    description: "Rolling Rock 24oz can",
    id: "ROR24C",
    packaging: "can",
    price: "18.99",
    size: "24oz"
  },
  ROS12B: {
    brand: "Royal Stout",
    category: "beer",
    description: "Royal Stout 12oz bottle",
    id: "ROS12B",
    packaging: "bottle",
    price: "29.99",
    size: "12oz"
  },
  ROS16C: {
    brand: "Rockstar",
    category: "energy drink",
    description: "Rockstar 16oz can",
    id: "ROS16C",
    packaging: "can",
    price: "32.95",
    size: "16oz"
  },
  SAA12B: {
    brand: "Samuel Adams",
    category: "beer",
    description: "Samuel Adams 12oz bottle",
    id: "SAA12B",
    packaging: "bottle",
    price: "36.89",
    size: "12oz"
  },
  SAA12P: {
    brand: "Samuel Adams",
    category: "beer",
    description: "Samuel Adams 12oz bottle loose",
    id: "SAA12P",
    packaging: "bottle loose",
    price: "31.95",
    size: "12oz"
  },
  SAA22B: {
    brand: "Samuel Adams",
    category: "beer",
    description: "Samuel Adams 22oz bottle",
    id: "SAA22B",
    packaging: "bottle",
    price: "31.95",
    size: "22oz"
  },
  SAP12B: {
    brand: "Sapporo",
    category: "beer",
    description: "Sapporo 12oz bottle",
    id: "SAP12B",
    packaging: "bottle",
    price: "36.49",
    size: "12oz"
  },
  SAP25C: {
    brand: "Sapporo",
    category: "beer",
    description: "Sapporo 25oz can",
    id: "SAP25C",
    packaging: "can",
    price: "31.49",
    size: "25oz"
  },
  SAR12B: {
    brand: "Saranac",
    category: "beer",
    description: "Saranac 12oz bottle",
    id: "SAR12B",
    packaging: "bottle",
    price: "29.95",
    size: "12oz"
  },
  SCH12C: {
    brand: "Schweppes",
    category: "soda",
    description: "Schweppes 12oz can",
    id: "SCH12C",
    packaging: "can",
    price: "12.89",
    size: "12oz"
  },
  SCH1LI: {
    brand: "Schweppes",
    category: "soda",
    description: "Schweppes 1liter",
    id: "SCH1LI",
    packaging: "bottle",
    price: "19.95",
    size: "1liter"
  },
  SCH20B: {
    brand: "Schweppes",
    category: "soda",
    description: "Schweppes 20oz bottle",
    id: "SCH20B",
    packaging: "bottle",
    price: "23.89",
    size: "20oz"
  },
  SCH2LI: {
    brand: "Schweppes",
    category: "soda",
    description: "Schweppes 2liter",
    id: "SCH2LI",
    packaging: "bottle",
    price: "11.89",
    size: "2liter"
  },
  SCO12B: {
    brand: "Schofferhofer",
    category: "beer",
    description: "Schofferhofer 12oz bottle",
    id: "SCO12B",
    packaging: "bottle",
    price: "32.49",
    size: "12oz"
  },
  SDL10B: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 10oz bottle",
    id: "SDL10B",
    packaging: "bottle",
    price: "13.95",
    size: "10oz"
  },
  SDL16B: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 16oz bottle",
    id: "SDL16B",
    packaging: "bottle",
    price: "10.95",
    size: "16oz"
  },
  SDL1GA: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 1 gallon",
    id: "SDL1GA",
    packaging: "bottle",
    price: "12.99",
    size: "1 gallon"
  },
  SDL20B: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 20oz bottle",
    id: "SDL20B",
    packaging: "bottle",
    price: "17.95",
    size: "20oz"
  },
  SDL2LI: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 2liter",
    id: "SDL2LI",
    packaging: "bottle",
    price: "9.69",
    size: "2liter"
  },
  SDL64B: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 64oz bottle",
    id: "SDL64B",
    packaging: "bottle",
    price: "12.99",
    size: "64oz"
  },
  SDL6B: {
    brand: "Sunny Delight",
    category: "juice",
    description: "Sunny Delight 6oz bottle",
    id: "SDL6B",
    packaging: "bottle",
    price: "16.39",
    size: "6oz"
  },
  SEA12B: {
    brand: "Seagrams Escape",
    category: "soda",
    description: "Seagrams Escape 12oz bottle",
    id: "SEA12B",
    packaging: "bottle",
    price: "24.69",
    size: "12oz"
  },
  SEA12C: {
    brand: "Seagrams",
    category: "soda",
    description: "Seagrams 12oz can",
    id: "SEA12C",
    packaging: "can",
    price: "9.95",
    size: "12oz"
  },
  SEA20B: {
    brand: "Seagrams",
    category: "soda",
    description: "Seagrams 20oz bottle",
    id: "SEA20B",
    packaging: "bottle",
    price: "21.99",
    size: "20oz"
  },
  SEA2LI: {
    brand: "Seagrams",
    category: "soda",
    description: "Seagrams 2liter",
    id: "SEA2LI",
    packaging: "bottle",
    price: "12.99",
    size: "2liter"
  },
  SEI12B: {
    brand: "Sierra Nevada",
    category: "beer",
    description: "Sierra Nevada 12oz bottle",
    id: "SEI12B",
    packaging: "bottle",
    price: "32.49",
    size: "12oz"
  },
  SEI22B: {
    brand: "Sierra Nevada",
    category: "beer",
    description: "Sierra Nevada 22oz bottle",
    id: "SEI22B",
    packaging: "bottle",
    price: "31.95",
    size: "22oz"
  },
  SHA12B: {
    brand: "Shandy",
    category: "beer",
    description: "Shandy 12oz bottle",
    id: "SHA12B",
    packaging: "bottle",
    price: "34.69",
    size: "12oz"
  },
  SHB12B: {
    brand: "Shiner Bock",
    category: "beer",
    description: "Shiner Bock 12oz bottle",
    id: "SHB12B",
    packaging: "bottle",
    price: "39.95",
    size: "12oz"
  },
  SHT12B: {
    brand: "Shocktop",
    category: "beer",
    description: "Shocktop 12oz bottle",
    id: "SHT12B",
    packaging: "bottle",
    price: "30.49",
    size: "12oz"
  },
  SIM20B: {
    brand: "Sierra Mist",
    category: "soda",
    description: "Sierra Mist 20oz bottle",
    id: "SIM20B",
    packaging: "bottle",
    price: "21.49",
    size: "20oz"
  },
  SIM2LI: {
    brand: "Sierra Mist",
    category: "soda",
    description: "Sierra Mist 2liter",
    id: "SIM2LI",
    packaging: "bottle",
    price: "9.89",
    size: "2liter"
  },
  SMI12B: {
    brand: "Smirnoff Ice",
    category: "beer",
    description: "Smirnoff Ice 12oz bottle",
    id: "SMI12B",
    packaging: "bottle",
    price: "33.49",
    size: "12oz"
  },
  SMI22B: {
    brand: "Smirnoff Ice",
    category: "beer",
    description: "Smirnoff Ice 22oz bottle",
    id: "SMI22B",
    packaging: "bottle",
    price: "26.89",
    size: "22oz"
  },
  SMW16B: {
    brand: "Smartwater",
    category: "water",
    description: "Smartwater 16oz bottle",
    id: "SMW16B",
    packaging: "bottle",
    price: "21.29",
    size: "16oz"
  },
  SMW1LI: {
    brand: "Smartwater",
    category: "water",
    description: "Smartwater 1liter",
    id: "SMW1LI",
    packaging: "bottle",
    price: "19.95",
    size: "1liter"
  },
  SMW20B: {
    brand: "Smartwater",
    category: "water",
    description: "20oz bottle",
    id: "SMW20B",
    packaging: "bottle",
    price: "25.89",
    size: "20oz"
  },
  SMW24B: {
    brand: "Smartwater",
    category: "water",
    description: "Smartwater 24oz bottle",
    id: "SMW24B",
    packaging: "bottle",
    price: "25.89",
    size: "24oz"
  },
  SNA16B: {
    brand: "Snapple",
    category: "juice",
    description: "Snapple 16oz bottle",
    id: "SNA16B",
    packaging: "bottle",
    price: "19.89",
    size: "16oz"
  },
  SNA20B: {
    brand: "Snapple",
    category: "juice",
    description: "Snapple 20oz bottle",
    id: "SNA20B",
    packaging: "bottle",
    price: "19.89",
    size: "20oz"
  },
  SNA32B: {
    brand: "Snapple",
    category: "juice",
    description: "Snapple 32oz bottle",
    id: "SNA32B",
    packaging: "bottle",
    price: "17.39",
    size: "32oz"
  },
  SNS12B: {
    brand: "Scotty's Natural Soda",
    category: "soda",
    description: "Scotty's Natural Soda 12oz bottle",
    id: "SNS12B",
    packaging: "bottle",
    price: "18.95",
    size: "12oz"
  },
  SOL12B: {
    brand: "Sol",
    category: "beer",
    description: "Sol 12oz bottle",
    id: "SOL12B",
    packaging: "bottle",
    price: "34.95",
    size: "12oz"
  },
  SOL32B: {
    brand: "Sol",
    category: "beer",
    description: "Sol 32oz bottle",
    id: "SOL32B",
    packaging: "bottle",
    price: "23.49",
    size: "32oz"
  },
  SPA12B: {
    brand: "Sparten",
    category: "beer",
    description: "Sparten 12oz bottle",
    id: "SPA12B",
    packaging: "bottle",
    price: "33.50",
    size: "12oz"
  },
  SPG12B: {
    brand: "St. Paul's Girl",
    category: "beer",
    description: "St. Paul's Girl 12oz bottle",
    id: "SPG12B",
    packaging: "bottle",
    price: "27.39",
    size: "12oz"
  },
  SPI17B: {
    brand: "Sparkling Ice",
    category: "water",
    description: "Sparkling 17oz Ice bottle",
    id: "SPI17B",
    packaging: "bottle",
    price: "11.39",
    size: "17oz"
  },
  SPR10B: {
    brand: "Sprite",
    category: "soda",
    description: "Sprite 10oz bottle",
    id: "SPR10B",
    packaging: "bottle",
    price: "15.99",
    size: "10oz"
  },
  SPR12C: {
    brand: "Sprite",
    category: "soda",
    description: "Sprite 12oz can",
    id: "SPR12C",
    packaging: "can",
    price: "11.69",
    size: "12oz"
  },
  SPR1LI: {
    brand: "Sprite",
    category: "soda",
    description: "Sprite 1liter",
    id: "SPR1LI",
    packaging: "bottle",
    price: "19.95",
    size: "1liter"
  },
  SPR20B: {
    brand: "Sprite",
    category: "soda",
    description: "Sprite 20oz bottle",
    id: "SPR20B",
    packaging: "bottle",
    price: "22.99",
    size: "20oz"
  },
  SPR2LI: {
    brand: "Sprite",
    category: "soda",
    description: "Sprite 67 0Z  2LI  ",
    id: "SPR2LI",
    packaging: "bottle",
    price: "12.95",
    size: "2liter"
  },
  SPR8B: {
    brand: "Sprite",
    category: "soda",
    description: "Sprite 8oz bottle",
    id: "SPR8B",
    packaging: "bottle",
    price: "19.89",
    size: "8oz"
  },
  SPS12C: {
    brand: "Sportshake",
    category: "fitness",
    description: "Sportshake 12oz can",
    id: "SPS12C",
    packaging: "can",
    price: "13.49",
    size: "12oz"
  },
  SQT12B: {
    brand: "Squirt",
    category: "soda",
    description: "Squirt 12oz bottle",
    id: "SQT12B",
    packaging: "bottle",
    price: "13.95",
    size: "12oz"
  },
  SQT2LI: {
    brand: "Squirt",
    category: "soda",
    description: "Squirt 2liter",
    id: "SQT2LI",
    packaging: "bottle",
    price: "9.99",
    size: "2liter"
  },
  STAR15: {
    brand: "Starbucks",
    category: "dairy",
    description: "Starbucks 9oz bottle 15pk",
    flavors: ["vanilla", "coffee", "mocha", "caramel"],
    id: "STAR15",
    packaging: "bottle",
    price: "17.95",
    size: "9oz"
  },
  STAR9B: {
    brand: "Starbucks",
    category: "dairy",
    description: "Starbucks 9oz bottle",
    flavors: ["vanilla", "coffee", "mocha", "caramel"],
    id: "STAR9B",
    packaging: "bottle",
    price: "17.95",
    size: "9oz"
  },
  STB12B: {
    brand: "Strongbow",
    category: "beer",
    description: "Strongbow 12oz bottle",
    id: "STB12B",
    packaging: "bottle",
    price: "32.95",
    size: "12oz"
  },
  STC12B: {
    brand: "Stella Cider",
    category: "beer",
    description: "Stella Cider 12oz bottle",
    id: "STC12B",
    packaging: "bottle",
    price: "39.49",
    size: "12oz"
  },
  STE12B: {
    brand: "Stella Artois",
    category: "beer",
    description: "Stella Artois 12oz bottle",
    id: "STE12B",
    packaging: "bottle",
    price: "35.89",
    size: "12oz"
  },
  STE12P: {
    brand: "Stella",
    category: "beer",
    description: "Stella 12oz bottle loose",
    id: "STE12P",
    packaging: "bottle loose",
    price: "30.99",
    size: "12oz"
  },
  STE22B: {
    brand: "Stella Artois",
    category: "beer",
    description: "Stella Artois 22oz bottle",
    id: "STE22B",
    packaging: "bottle",
    price: "32.69",
    size: "22oz"
  },
  STF24C: {
    brand: "St. Ides",
    category: "beer",
    description: "St. Ides 24oz can",
    id: "STF24C",
    packaging: "can",
    price: "26.99",
    size: "24oz"
  },
  STI16C: {
    brand: "St. Ides",
    category: "beer",
    description: "St. Ides 16oz can",
    id: "STI16C",
    packaging: "can",
    price: "21.89",
    size: "16oz"
  },
  STI20B: {
    brand: "St. Ides Special Brew",
    category: "beer",
    description: "St. Ides Special Brew 20oz bottle",
    id: "STI20B",
    packaging: "bottle",
    price: "26.99",
    size: "20oz"
  },
  STI22B: {
    brand: "St. Ides",
    category: "beer",
    description: "St. Ides 22oz bottle",
    id: "STI22B",
    packaging: "bottle",
    price: "22.69",
    size: "22oz"
  },
  STI24C: {
    brand: "St. Ides",
    category: "beer",
    description: "St. Ides 24oz can",
    id: "STI24C",
    packaging: "can",
    price: "18.95",
    size: "24oz"
  },
  STI40B: {
    brand: "St. Ides",
    category: "beer",
    description: "St. Ides 40oz bottle",
    id: "STI40B",
    packaging: "bottle",
    price: "27.39",
    size: "40oz"
  },
  STO12B: {
    brand: "Stone IPA",
    category: "beer",
    description: "Stone IPA 12oz bottle",
    id: "STO12B",
    packaging: "bottle",
    price: "39.99",
    size: "12oz"
  },
  STR12C: {
    brand: "Steel Reserve",
    category: "beer",
    description: "Steel Reserve 12oz can",
    id: "STR12C",
    packaging: "can",
    price: "15.99",
    size: "12oz"
  },
  STR16C: {
    brand: "Steel Reserve",
    category: "beer",
    description: "Steel Reserve 16oz can",
    id: "STR16C",
    packaging: "can",
    price: "19.49",
    size: "16oz"
  },
  STR22B: {
    brand: "Steel Reserve",
    category: "beer",
    description: "Steel Reserve 22oz bottle",
    id: "STR22B",
    packaging: "bottle",
    price: "22.89",
    size: "22oz"
  },
  STR24C: {
    brand: "Steel Reserve",
    category: "beer",
    description: "Steel Reserve 24oz can",
    id: "STR24C",
    packaging: "can",
    price: "15.99",
    size: "24oz"
  },
  STR40B: {
    brand: "Steel Reserve",
    category: "beer",
    description: "Steel Reserve 40oz bottle",
    id: "STR40B",
    packaging: "bottle",
    price: "23.49",
    size: "40oz"
  },
  SUD8B: {
    brand: "Sun Dew",
    category: "beer",
    description: "Sun Dew 8oz bottle",
    id: "SUD8B",
    packaging: "bottle",
    price: "7.69",
    size: "8oz"
  },
  SUH12B: {
    brand: "Sugar Hill",
    category: "beer",
    description: "Sugar Hill 12oz bottle",
    id: "SUH12B",
    packaging: "bottle",
    price: "36.49",
    size: "12oz"
  },
  SUN12C: {
    brand: "Sunkist",
    category: "soda",
    description: "Sunkist 12oz can",
    id: "SUN12C",
    packaging: "can",
    price: "10.95",
    size: "12oz"
  },
  SUN1LI: {
    brand: "Sunkist",
    category: "soda",
    description: "Sunkist 1liter",
    id: "SUN1LI",
    packaging: "bottle",
    price: "18.45",
    size: "1liter"
  },
  SUN20B: {
    brand: "Sunkist",
    category: "soda",
    description: "Sunkist 20oz bottle",
    id: "SUN20B",
    packaging: "bottle",
    price: "19.95",
    size: "20oz"
  },
  SUN2LI: {
    brand: "Sunkist",
    category: "soda",
    description: "Sunkist 2liter",
    id: "SUN2LI",
    packaging: "bottle",
    price: "9.89",
    size: "2liter"
  },
  TAM1GA: {
    brand: "Tampico",
    category: "beer",
    description: "Tampico 1 gallon",
    id: "TAM1GA",
    packaging: "bottle",
    price: "13.39",
    size: "1 gallon"
  },
  TEC12B: {
    brand: "Tecate",
    category: "beer",
    description: "Tecate 12oz bottle",
    id: "TEC12B",
    packaging: "bottle",
    price: "31.95",
    size: "12oz"
  },
  TEC12C: {
    brand: "Tecate",
    category: "beer",
    description: "Tecate 12oz can",
    id: "TEC12C",
    packaging: "can",
    price: "23.89",
    size: "12oz"
  },
  TEC24C: {
    brand: "Tecate",
    category: "beer",
    description: "Tecate 24oz can",
    id: "TEC24C",
    packaging: "can",
    price: "12.49",
    size: "24oz"
  },
  TEC32B: {
    brand: "Tecate",
    category: "beer",
    description: "Tecate 32oz bottle",
    id: "TEC32B",
    packaging: "bottle",
    price: "28.95",
    size: "32oz"
  },
  THB16B: {
    brand: "Thirst Burst",
    category: "juice",
    description: "Thirst Burst 16oz bottle",
    id: "THB16B",
    packaging: "bottle",
    price: "9.39",
    size: "16oz"
  },
  THB8B: {
    brand: "Thirst Burst",
    category: "juice",
    description: "Thirst Burst 8oz bottle",
    id: "THB8B",
    packaging: "bottle",
    price: "6.99",
    size: "8oz"
  },
  TIN9B: {
    brand: "Ting",
    category: "beer",
    description: "Ting 9oz bottle",
    id: "TIN9B",
    packaging: "bottle",
    price: "24.95",
    size: "9oz"
  },
  TOP20B: {
    brand: "Top Pop",
    category: "soda",
    description: "Top Pop 20oz bottle",
    id: "TOP20B",
    packaging: "bottle",
    price: "9.45",
    size: "20oz"
  },
  TOP3LI: {
    brand: "Top Pop",
    category: "soda",
    description: "Top Pop 3liter bottle",
    id: "TOP3LI",
    packaging: "bottle",
    price: "8.99",
    size: "3liter"
  },
  TRF12B: {
    brand: "Tropical Fantasy",
    category: "soda",
    description: "Tropical Fantasy 12oz bottle",
    flavors: [
      "cola",
      "fruit punch",
      "grape",
      "orange",
      "pineapple",
      "champagne"
    ],
    id: "TRF12B",
    packaging: "bottle",
    price: "9.29",
    size: "12oz"
  },
  TRF12C: {
    brand: "Tropical Fantasy",
    category: "soda",
    description: "Tropical Fantasy 12oz can",
    flavors: [
      "cola",
      "fruit punch",
      "grape",
      "orange",
      "pineapple",
      "champagne"
    ],
    id: "TRF12C",
    packaging: "can",
    price: "8.95",
    size: "12oz"
  },
  TRF16C: {
    brand: "Tropical Fantasy",
    category: "soda",
    description: "Tropical Fantasy 16oz can",
    flavors: [
      "cola",
      "fruit punch",
      "grape",
      "orange",
      "pineapple",
      "champagne"
    ],
    id: "TRF16C",
    packaging: "can",
    price: "8.99",
    size: "16oz"
  },
  TRF24B: {
    brand: "Tropical Fantasy",
    category: "soda",
    description: "Tropical Fantasy 24oz bottle",
    flavors: [
      "cola",
      "fruit punch",
      "grape",
      "orange",
      "pineapple",
      "champagne"
    ],
    id: "TRF24B",
    packaging: "bottle",
    price: "16.49",
    size: "24oz"
  },
  TRO10B: {
    brand: "Tropicana",
    category: "juice",
    description: "Tropicana 10oz bottle",
    flavors: ["orange", "grape", "apple", "cranberry", "ruby"],
    id: "TRO10B",
    packaging: "bottle",
    price: "15.89",
    size: "10oz"
  },
  TRO14C: {
    brand: "Tropicana",
    category: "juice",
    description: "Tropicana 14oz can",
    flavors: ["orange", "grape", "apple", "cranberry", "ruby"],
    id: "TRO14C",
    packaging: "can",
    price: "13.95",
    size: "14oz"
  },
  TRO16B: {
    brand: "Tropicana",
    category: "juice",
    description: "Tropicana 16oz bottle",
    flavors: ["orange", "grape", "apple", "cranberry", "ruby"],
    id: "TRO16B",
    packaging: "bottle",
    price: "14.95",
    size: "16oz"
  },
  TRO32B: {
    brand: "Tropicana",
    category: "juice",
    description: "Tropicana 32oz bottle",
    flavors: ["orange", "grape", "apple", "cranberry", "ruby"],
    id: "TRO32B",
    packaging: "bottle",
    price: "26.49",
    size: "32oz"
  },
  TRO59B: {
    brand: "Tropicana",
    category: "juice",
    description: "Tropicana 59oz bottle",
    flavors: ["orange", "grape", "apple", "cranberry", "ruby"],
    id: "TRO59B",
    packaging: "bottle",
    price: "20.99",
    size: "59oz"
  },
  TRO64B: {
    brand: "Tropicana",
    category: "juice",
    description: "Tropicana 64oz bottle",
    flavors: ["orange", "grape", "apple", "cranberry", "ruby"],
    id: "TRO64B",
    packaging: "bottle",
    price: "11.85",
    size: "64oz"
  },
  TWH12B: {
    brand: "Two Hearted Ale",
    category: "beer",
    description: "Two Hearted Ale 12oz bottle",
    id: "TWH12B",
    packaging: "bottle",
    price: "44.95",
    size: "12oz"
  },
  TWI24C: {
    brand: "Twisted Tea",
    category: "beer",
    description: "Twisted Tea 24oz can",
    id: "TWI24C",
    packaging: "can",
    price: "28.95",
    size: "24oz"
  },
  TWT12B: {
    brand: "Twisted Tea",
    category: "beer",
    description: "Twisted Tea 12oz bottle",
    id: "TWT12B",
    packaging: "bottle",
    price: "32.95",
    size: "12oz"
  },
  V8S16B: {
    brand: "V8 Splash",
    category: "juice",
    description: "V8 Splash 16oz bottle",
    id: "V8S16B",
    packaging: "bottle",
    price: "12.95",
    size: "16oz"
  },
  V8V12C: {
    brand: "V8 Vegetable",
    category: "juice",
    description: "V8 Vegetable 12oz can",
    id: "V8V12C",
    packaging: "can",
    price: "16.99",
    size: "12oz"
  },
  VIC12B: {
    brand: "Victoria",
    category: "beer",
    description: "Victoria 12oz bottle",
    id: "VIC12B",
    packaging: "bottle",
    price: "33.69",
    size: "12oz"
  },
  VIC12C: {
    brand: "Victoria",
    category: "beer",
    description: "Victoria 12oz can",
    id: "VIC12C",
    packaging: "can",
    price: "31.89",
    size: "12oz"
  },
  VIC12P: {
    brand: "Victoria Loose",
    category: "beer",
    description: "Victoria Loose 12oz bottle loose",
    id: "VIC12P",
    packaging: "bottle loose",
    price: "30.89",
    size: "12oz"
  },
  VIC16B: {
    brand: "Vita Coco",
    category: "water",
    description: "Vita Coco 16oz bottle",
    id: "VIC16B",
    packaging: "bottle",
    price: "15.49",
    size: "16oz"
  },
  VIC32B: {
    brand: "Victoria",
    category: "beer",
    description: "Victoria 32oz bottle",
    id: "VIC32B",
    packaging: "bottle",
    price: "38.95",
    size: "32oz"
  },
  VIG12B: {
    brand: "Victoria Golden",
    category: "beer",
    description: "Victoria Golden 12oz bottle",
    id: "VIG12B",
    packaging: "bottle",
    price: "49.95",
    size: "12oz"
  },
  VIT24B: {
    brand: "Vitamin Water",
    category: "water",
    description: "Vitamin Water 24oz bottle",
    id: "VIT24B",
    packaging: "bottle",
    price: "25.89",
    size: "24oz"
  },
  VIT32B: {
    brand: "Vitamin Water",
    category: "water",
    description: "Vitamin Water 32oz bottle",
    id: "VIT32B",
    packaging: "bottle",
    price: "19.99",
    size: "32oz"
  },
  WAR12B: {
    brand: "Warsteiner",
    category: "beer",
    description: "Warsteiner 12oz bottle",
    id: "WAR12B",
    packaging: "bottle",
    price: "34.49",
    size: "12oz"
  },
  WEJ16B: {
    brand: "Welch's Juice",
    category: "juice",
    description: "Welch's Juice 16oz bottle",
    id: "WEJ16B",
    packaging: "bottle",
    price: "13.69",
    size: "16oz"
  },
  WEL12C: {
    brand: "welch",
    category: "soda",
    description: "welch's grape 12 oz can soda",
    id: "WEL12C",
    packaging: "can",
    price: "11.89",
    size: "12 oz"
  },
  WEL20B: {
    brand: "Welch's Grape",
    category: "juice",
    description: "Welch's Grape 20oz bottle",
    id: "WEL20B",
    packaging: "bottle",
    price: "18.99",
    size: "20oz"
  },
  WEL2LI: {
    brand: "Welch's Grape",
    category: "juice",
    description: "Welch's Grape 2liter",
    id: "WEL2LI",
    packaging: "bottle",
    price: "11.69",
    size: "2liter"
  },
  WIB12B: {
    brand: "Wild Blue",
    category: "beer",
    description: "Wild Blue 12oz bottle",
    id: "WIB12B",
    packaging: "bottle",
    price: "31.49",
    size: "12oz"
  },
  WOC12B: {
    brand: "Woodchuck",
    category: "beer",
    description: "Woodchuck 12oz bottle",
    id: "WOC12B",
    packaging: "bottle",
    price: "33.69",
    size: "12oz"
  },
  WOO12B: {
    brand: "Woodpecker Cider",
    category: "beer",
    description: "Woodpecker Cider 12oz bottle",
    id: "WOO12B",
    packaging: "bottle",
    price: "33.69",
    size: "12oz"
  },
  YAN16B: {
    brand: "Yankee Water",
    category: "water",
    description: "Yankee Water 16oz bottle",
    id: "YAN16B",
    packaging: "bottle",
    price: "17.20",
    size: "16oz"
  },
  YAN23B: {
    brand: "Yankee Water",
    category: "water",
    description: "Yankee Water 23oz bottle",
    id: "YAN23B",
    packaging: "bottle",
    price: "24.20",
    size: "23oz"
  },
  YIN12B: {
    brand: "Yuengling",
    category: "beer",
    description: "Yuengling 12oz bottle",
    id: "YIN12B",
    packaging: "bottle",
    price: "26.49",
    size: "12oz"
  },
  YIN22B: {
    brand: "Yuengling",
    category: "beer",
    description: "Yuengling 22oz bottle",
    id: "YIN22B",
    packaging: "bottle",
    price: "25.39",
    size: "22oz"
  },
  YIN24B: {
    brand: "Yuengling",
    category: "beer",
    description: "Yuengling 24oz bottle",
    id: "YIN24B",
    packaging: "bottle",
    price: "25.39",
    size: "24oz"
  },
  YOH12B: {
    brand: "Yoohoo",
    category: "dairy",
    description: "Yoohoo 12oz bottle",
    id: "YOH12B",
    packaging: "bottle",
    price: "12.89",
    size: "12oz"
  },
  YOH12C: {
    brand: "Yoohoo",
    category: "dairy",
    description: "Yoohoo 12oz can",
    id: "YOH12C",
    packaging: "can",
    price: "12.89",
    size: "12oz"
  },
  YOH16B: {
    brand: "Yoohoo",
    category: "dairy",
    description: "Yoohoo 16oz bottle",
    id: "YOH16B",
    packaging: "bottle",
    price: "20.95",
    size: "16oz"
  },
  ZIC14B: {
    brand: "Zico coconut",
    category: "water",
    description: "Zico coconut 14oz bottle",
    id: "ZIC14B",
    packaging: "bottle",
    price: "18.95",
    size: "14oz"
  }
};
