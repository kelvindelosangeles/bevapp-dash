// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { ActionBar, Application, Body } from "../components/layout/Application";
// import { Colors } from "../Constants/Colors";
// import moment from "moment-timezone";
// import firebase from "firebase";
// import DatePicker from "../components/DatePickerv2";
// import CustomerSelect from "../Global/CustomerSelect/CustomerSelect";
// import { useSelector } from "react-redux";
// import SmartSelect from "../components/SmartSelect";
// import { Order as OrderModel } from "../Models/Order";

// const ManualTasks = () => {
//     const [orders, setOrders] = useState(null);
//     const [customer, setCustomer] = useState(null);
//     const [beverage, setBeverage] = useState(null);
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [results, setResults] = useState([]);

//     const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

//     useEffect(() => {
//         const getOrders = async () => {
//             try {
//                 const response = await firebase.firestore().collection("ordersv2").get();
//                 const data = await response.docs
//                     .filter((f) => {
//                         // fitlers out orders coming from orders
//                         return f.id != "orders";
//                     })
//                     .map((a) => {
//                         return Object.values(a.data());
//                     })
//                     .flat()
//                     .map((b) => {
//                         return Object.values(b.orders);
//                     })
//                     .flat();

//                 setOrders(data);
//             } catch (error) {
//                 console.log(error);
//                 window.alert("An error has occured");
//             }
//         };
//         getOrders();
//     }, []);

//     useEffect(() => {
//         const search = () => {
//             customer ? SearchByCustomer() : SearchByCompany();
//         };

//         fromDate && toDate && orders && beverage && search();
//     }, [customer, beverage]);

//     const SearchByCustomer = () => {
//         setResults(
//             orders
//                 .filter((b) => {
//                     return moment(b.details.createdAt).isSameOrAfter(fromDate) && moment(b.details.createdAt).isSameOrBefore(toDate);
//                 })
//                 .filter((a) => {
//                     return a.customer.id == customer.id;
//                 })
//                 .filter((c) => {
//                     return c.cart.hasOwnProperty(beverage.id);
//                 })
//         );
//     };
//     const SearchByCompany = () => {
//         setResults(
//             orders
//                 .filter((b) => {
//                     return moment(b.details.createdAt).isSameOrAfter(fromDate) && moment(b.details.createdAt).isSameOrBefore(toDate);
//                 })
//                 .filter((c) => {
//                     return c.cart.hasOwnProperty(beverage.id);
//                 })
//         );
//     };
//     const customerChangeHandler = (e, value) => {
//         setCustomer(value);
//     };

//     const calcCasesOfTypeCost = (order, beverage) => {
//         const beverageID = beverage.id;
//         try {
//             const qty = order.cart[beverageID].qty;
//             return (parseFloat(order.customer.specialPrices[beverageID].price) * parseInt(qty)).toFixed(2);
//         } catch (error) {
//             const qty = order.cart[beverageID].qty;
//             // console.log(qty, order.cart[beverageID].price);
//             return (parseFloat(order.cart[beverageID].price) * parseInt(qty)).toFixed(2);
//         }
//     };
//     const calcCasesOfTypeCostTotal = (list, beverage) => {
//         return list
//             .map((a) => {
//                 return calcCasesOfTypeCost(a, beverage);
//             })
//             .reduce((b, c) => {
//                 return (parseFloat(b) + parseFloat(c)).toFixed(2);
//             });
//     };
//     const calcCasesOfTypeTotal = (list, beverage) => {
//         try {
//             return list
//                 .map((x) => {
//                     return x.cart[beverage.id].qty;
//                 })
//                 .reduce((y, z) => {
//                     return parseInt(y) + parseInt(z);
//                 });
//         } catch (error) {
//             console.log(error);
//             return "err";
//         }
//     };

//     return !orders ? (
//         <h1>Loading</h1>
//     ) : (
//         <Application>
//             <ActionBar>
//                 <ActionWrapper>
//                     <DatePicker theDate={fromDate} onChange={setFromDate} label='Select a start Date' />
//                     {fromDate && (
//                         <DatePicker theDate={toDate} onChange={setToDate} label='Select an end Date' minDate={moment(fromDate).add(1, "day")} />
//                     )}
//                     {toDate && <CustomerSelect customerChangeHandler={customerChangeHandler} selectedCustomer={customer} />}
//                     {toDate && <SmartSelect data={beverages} onChange={(e, val) => setBeverage(val)} value={beverage} />}
//                 </ActionWrapper>
//             </ActionBar>
//             <Body title={`Sales Order By Item Report: ${customer ? customer.address : "Alex Beverage"}`}>
//                 <Component>
//                     {results.map((a) => {
//                         return (
//                             <Order>
//                                 {!customer && <p className='address'>{a.customer.address}</p>}
//                                 <p>{moment(a.details.createdAt).format("L")}</p>
//                                 {a.cart[beverage.id] && <p>{a.cart[beverage.id].qty} Cases</p>}
//                                 {/* <p>{OrderModel.CalculateItem(a.cart[beverage.id], a.customer.specialPrices)}</p> */}
//                             </Order>
//                         );
//                     })}
//                 </Component>
//                 {results.length > 0 && (
//                     <Footer>
//                         <p>
//                             Total Cases: <span>{calcCasesOfTypeTotal(results, beverage)}</span>
//                         </p>
//                         {/* <p>
//                             Total Cost: <span>${CalcTotalMultipleOrders(results)}</span>
//                         </p> */}
//                     </Footer>
//                 )}
//             </Body>
//         </Application>
//     );
// };

// const Component = styled.div`
//     .data {
//         display: grid;
//         grid-template-columns: 150px 150px;
//         grid-row-gap: 4px;
//         grid-template-areas:
//             "label label"
//             "date now"
//             "prevPrice currPrice";
//         margin-bottom: 20px;
//         padding-bottom: 12px;
//         border-bottom: 2px solid ${Colors.lightGrey};
//         .label {
//             grid-area: label;
//             font-size: 18px;
//             font-weight: 700;
//         }
//         .date {
//             grid-area: date;
//             color: ${Colors.grey};
//         }
//         .prevPrice {
//             grid-area: prevPrice;
//         }
//         .now {
//             grid-area: now;
//             color: ${Colors.grey};
//         }
//         .currPrice {
//             grid-area: currPrice;
//             font-weight: 700;
//         }
//     }
// `;

// const ActionWrapper = styled.div`
//     display: grid;
//     grid-template-columns: min-content min-content 300px 300px;
//     grid-column-gap: 40px;
//     /* button {
//         padding: 14px 32px;
//         background-color: #1561de;
//         font-size: 16px;
//         font-weight: 600;
//         outline: none;
//         border: none;
//         border-radius: 4px;
//         white-space: nowrap;
//         color: white;
//         :disabled {
//             background-color: ${Colors.grey};
//         }
//     }
//     #reset {
//         background-color: ${Colors.yellow};
//         color: ${Colors.black};
//     } */
//     .MuiAutocomplete-clearIndicator {
//         color: red;
//     }
//     .eyWOBP .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child {
//         margin-bottom: 18px;
//     }
// `;

// const Order = styled.div`
//     border: 1px solid ${Colors.lightGrey};
//     display: grid;
//     grid-template-columns: minmax(0px, 200px) repeat(3, 150px);
//     padding: 16px 12px;
//     font-size: 15px;
//     align-items: center;
//     grid-column-gap: 24px;
//     .address {
//         text-transform: capitalize;
//     }
//     :nth-of-type(even) {
//         background-color: ${Colors.lightGrey};
//     }
// `;

// const Footer = styled.div`
//     display: grid;
//     grid-row-gap: 12px;
//     margin-top: 120px;
//     p {
//         font-size: 18px;
//         span {
//             font-weight: 700;
//         }
//     }
// `;
// export default ManualTasks;
