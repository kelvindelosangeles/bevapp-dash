// import React from "react";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import moment from "moment";
// const CustomersToReachOutTo = () => {
//     // Simply Change the date and it will generate a list of all customers that dont have an order in the system after that date

//     let AfterDate = "06/05/2020";
//     // Change the FirestoreConnect in App.js to include all orders

//     let OrdersCombined = {};

//     const customers = Object.values(useSelector((state) => state.Firestore.data.store.customers));
//     const allOrders = Object.values(useSelector((state) => state.Firestore.data.orders)).forEach((i) => {
//         Object.assign(OrdersCombined, i);
//     });

//     const CustomersThatPlacedOrders = [
//         // return a new Set to eliminate duplicates
//         ...new Set(
//             Object.values(OrdersCombined)
//                 .filter((i) => {
//                     // Filter By Date
//                     return moment(i.details.createdAt).isAfter(AfterDate);
//                 })
//                 .map((x) => {
//                     // return an array of only the customer IDS
//                     return x.customer.address;
//                 })
//         ),
//     ];

//     let CustomerThatDidntPlaceAnOrder = customers
//         .filter((x) => {
//             return CustomersThatPlacedOrders.indexOf(x.address) < 0;
//         })
//         .sort((a, b) => {
//             return a.name > b.name ? -1 : 1;
//         });

//     return (
//         <Component>
//             <p className='header'>Customers That didnt Place Orders after {AfterDate} </p>

//             <div className='grid'>
//                 {CustomerThatDidntPlaceAnOrder.sort().map((y) => {
//                     return <p>{y.address}</p>;
//                 })}
//             </div>
//         </Component>
//     );
// };
// const Component = styled.div`
//     padding: 32px;
//     .header {
//         font-size: 20px;
//         margin-bottom: 24px;
//         font-weight: 600;
//     }
//     .grid {
//         display: grid;
//         grid-template-columns: repeat(3, 1fr);
//         grid-gap: 16px;
//     }
// `;
// export default CustomersToReachOutTo;
