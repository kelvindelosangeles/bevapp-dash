// import React, { useState } from "react";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import moment from "moment";
// import { Order as OrderModel } from "../../Models/Order";

// const TheCustomer = "823";
// const theDate = "07/15/2020";

// const CustomerPurchaseSheet = () => {
//     const [test, setTest] = useState({});
//     const orders = useSelector((state) => state.Firestore.data.orders);
//     const ordersv2 = useSelector((state) => state.Firestore.data.ordersv2.orders);
//     const allordersv2OBJ = {};
//     const allordersv2OBJFinal = {};
//     const allordersv2 = Object.entries(useSelector((state) => state.Firestore.data.ordersv2))
//         .filter((x) => {
//             return x[0] !== "orders";
//         })
//         .map((b) => {
//             Object.assign(allordersv2OBJ, b[1]);
//             return b[1];
//         });

//     Object.values(allordersv2OBJ).map((s) => {
//         Object.assign(allordersv2OBJFinal, s.orders);
//     });

//     console.log(allordersv2OBJFinal);

//     // Orders from v2 are included
//     let ordersCombined = { ...ordersv2, ...allordersv2OBJFinal };
//     // Create a list of all orders

//     Object.values(orders).forEach((i) => {
//         // console.log(i);
//         Object.assign(ordersCombined, i);
//     });

//     allordersv2.forEach((y) => {
//         // console.log(y);
//         // Object.assign(ordersCombined, y);
//     });

//     const allOrders = Object.values(ordersCombined);
//     console.log(allordersv2);
//     console.log(allordersv2OBJ);
//     console.log("Total Orders Combined: ", Object.values(ordersCombined).length);

//     const data = allOrders
//         .filter((i) => {
//             return i.customer.address.includes(TheCustomer);
//         })
//         .filter((a) => {
//             return moment(a.details.createdAt).isAfter(moment(theDate));
//         });

//     console.log(data);

//     const RouteTotal = () => {
//         try {
//             return data
//                 .map((i) => {
//                     return parseFloat(OrderModel.CalculateCart(i.cart, i.customer.specialPrices));
//                 })
//                 .reduce((a, b) => {
//                     return a + b;
//                 })
//                 .toFixed(2);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const RouteCases = () => {
//         try {
//             return data
//                 .map((i) => {
//                     return parseInt(OrderModel.CalculateCases(i.cart));
//                 })
//                 .reduce((a, b) => {
//                     return a + b;
//                 });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     data.map((i) => {
//         // TODO: Activate for control
//         console.log(i.customer.address);
//     });

//     return (
//         <Component>
//             <header>
//                 <p className='header'>
//                     Customer: <span>{data[1].customer.address || "No Customers Found"}</span>
//                 </p>
//                 <p className='header'>
//                     Orders after : <span>{moment(theDate).format("L")}</span>
//                 </p>
//             </header>

//             <div className='grid'>
//                 <div className='item head'>
//                     <h3>Order #</h3>
//                     <h3>Date</h3>
//                     <h3>Cases</h3>
//                     <h3>Total</h3>
//                 </div>
//                 {data
//                     .sort((a, b) => {
//                         return a.details.orderID > b.details.orderID ? 1 : -1;
//                     })
//                     .map((x) => {
//                         return (
//                             <div className='item '>
//                                 <p>{x.details.orderID}</p>
//                                 <p>{x.details.createdAt}</p>
//                                 <p>{OrderModel.CalculateCases(x.cart)}</p>
//                                 <p>$ {OrderModel.CalculateCart(x.cart, x.customer.specialPrices)}</p>
//                             </div>
//                         );
//                     })}
//             </div>
//             <div className='footer'>
//                 <p>
//                     Total Cases: <span>{RouteCases()}</span>
//                 </p>
//                 <p>
//                     Total: <span>${RouteTotal()}</span>
//                 </p>
//             </div>
//         </Component>
//     );
// };
// const Component = styled.div`
//     padding: 32px;
//     header {
//         display: flex;
//         justify-content: space-between;
//         .header {
//             font-size: 20px;
//             margin-bottom: 64px;
//             span {
//                 font-weight: 600;
//                 text-transform: uppercase;
//             }
//         }
//     }
//     .grid {
//         .item.head {
//             h3 {
//                 font-weight: 600 !important;
//                 padding: 0 8px;
//             }
//             margin-bottom: 24px;
//         }
//         .item {
//             display: grid;
//             grid-template-columns: repeat(4, 1fr);
//             p {
//                 padding: 16px 8px;
//                 border: 1px solid black;
//             }
//         }
//     }
//     .footer {
//         margin-top: 40px;
//         display: grid;
//         grid-row-gap: 24px;
//         p {
//             font-size: 18px;
//             span {
//                 font-weight: 700;
//             }
//         }
//     }
// `;
// export default CustomerPurchaseSheet;
