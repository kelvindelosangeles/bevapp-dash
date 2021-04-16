import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MobileNavbar from "../../components/MobileNavbar";
import colors from "../../constants/Colors";
import Date from "./components/Date";
import Header from "./components/Header";
import Posts from "./components/Posts";
import firebase from "firebase";

const PostSummary = () => {
    const [theDate, setTheDate] = useState(moment().valueOf());
    const [orders, setOrders] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const getRoutes = async () => {
            try {
                const response = await firebase.firestore().collection("ordersv2").get();
                const data = await response.docs
                    .filter((f) => {
                        // filters out orders coming from orders
                        return f.id != "orders";
                    })
                    .map((a) => {
                        return Object.values(a.data());
                    })
                    .flat()
                    .map((b) => {
                        let getDateFromRoute = b.details.dates ? b.details.dates.routeDate.date : b.details.createdAt;
                        let routeOrders = Object.values(b.orders);
                        let routeOrdersEnhanced = routeOrders.map((c) => {
                            return { routeDate: getDateFromRoute, ...c };
                        });

                        return routeOrdersEnhanced;
                    })
                    .flat();

                setOrders(data);
            } catch (error) {
                console.log(error);
                window.alert("An error has occured");
            }
        };
        getRoutes();
    }, []);

    useEffect(() => {
        const setOrdersFilteredByPaymentDate = () => {
            const ordersFiltered = orders
                .filter((a) => {
                    // fitler by orders that have payments
                    return a.payment;
                })
                .filter((b) => {
                    // filter by orders that match the comparison date
                    const paymentPostDate = moment(b.payment.createdAt).format("L");
                    const comparisonDate = moment(theDate).format("L");
                    return paymentPostDate == comparisonDate;
                });

            setPosts(ordersFiltered);
        };
        orders && setOrdersFilteredByPaymentDate();
    }, [orders, theDate]);

    return (
        <Page>
            <MobileNavbar />
            <Header />
            <Date theDate={theDate} setTheDate={setTheDate} />
            {orders ? <Posts orders={posts} /> : <h1>Loading</h1>}
        </Page>
    );
};

const Page = styled.div`
    grid-area: app;
    padding: 16px;
    background-color: white;
    height: 100vh;
    overflow: scroll;
    background-color: ${colors.greyBackground};
`;

export default PostSummary;

// TODO: move the get orders function to the global scope.  This function is important because it contains enhancers for the order that we could use across the whole project.
