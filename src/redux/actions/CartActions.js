import firestore from "firebase";
import moment from "moment";
import { useSelector } from "react-redux";

export const completeOrder = (activeOrder, orders) => {
    return (dispatch, getState, getFirebase) => {
        console.log(getFirebase().firestore());
    };
};
// dispatch({ type: "CLEAR_ACTIVE_ORDER" });
// console.log(orderID);

// console.log(moment().format("YYYYMMw"));
// console.log(moment(`${createdAt} 2020`).format("YYYYMMw"));

// If the week document doesnt already exists it creates it
// the weekd document is labeld as the year + the month + the week of the year
// Use update to push an order into the week document

// let weekDocument = moment(`${activeOrder.details.createdAt} 2020`).format("YYYYMMw");
// firestore
//     .update(
//         {
//             collection: "orders",
//             doc: weekDocument,
//         },
//         { [activeOrder.details.orderID]: { ...activeOrder, details: { ...activeOrder.details, complete: true } } }
//     )
//     .then(() => {
//         console.log("successfully added the order to the week document");
//     })
//     .then(() => {
//         const { [activeOrder.details.orderID]: deleted, ...rest } = orders;
//         firestore
//             .set(
//                 {
//                     collection: "orders",
//                     doc: "order",
//                 },
//                 rest
//             )
//             .then(() => {
//                 console.log("successfuly deleted from the orders doc");
//             })
//             .catch((err) => {
//                 console.log("There was an error");
//             });
//     })
//     .then(() => {

//     })
//     .catch((err) => {
//         console.log(err);
//         alert("There was an error please try again later");
//     });
