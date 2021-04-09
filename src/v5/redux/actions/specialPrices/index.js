import { object, omit } from "underscore";

export const removeSpecialPriceFromAllCustomers = (beverage, firestore) => async (dispatch, getState) => {
    try {
        const beverages = getState().Firestore.data.inventory.beverages;
        const customers = Object.values(getState().Firestore.data.store.customers);
        // Check if the item exists
        if (!beverages.hasOwnProperty(beverage.toUpperCase())) {
            window.alert("item does not exist ");
            return;
        }

        let updatedCustomerList = {};
        customers.map((a) => {
            // check i an item has special prcies and if the customer has a sale on that item
            // if so return the list without that item, otherwise return the original list
            a.specialPrices && a.specialPrices.hasOwnProperty(beverage.toUpperCase())
                ? Object.assign(updatedCustomerList, {
                      [a.id]: { ...a, specialPrices: omit(a.specialPrices, beverage.toUpperCase()) },
                  })
                : Object.assign(updatedCustomerList, { [a.id]: { ...a } });
        });

        firestore
            .set(
                {
                    collection: "store",
                    doc: "customers",
                },
                updatedCustomerList
            )
            .then(() => {
                console.log(`removed all instances of ${beverage.toUpperCase()}`);
                window.alert(`removed all instances of ${beverage.toUpperCase()}`);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        window.alert("an error occured");
    }
};
