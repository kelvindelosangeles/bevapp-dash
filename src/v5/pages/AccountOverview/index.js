import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import MobileNavbar from "../../components/MobileNavbar";
import colors from "../../constants/Colors";
import Account from "./components/Account";
import DateRange from "./components/DateRange";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { useForm } from "react-hook-form";

const AccountOverview = () => {
    const [routes, setRoutes] = useState(null);
    const startDate = useState(moment().subtract(30, "days").valueOf());
    const endDate = useState(moment().valueOf());
    const [accounts, setAccounts] = useState([]);
    const customers = Object.values(useSelector((state) => state.Firestore.data.store.customers));
    const { register, watch } = useForm();
    const searchFilter = watch("search");

    useEffect(() => {
        const getRoutes = async () => {
            try {
                const response = await firebase.firestore().collection("ordersv2").get();
                const data = await response.docs
                    .filter((f) => {
                        // fitlers out orders coming from orders
                        return f.id != "orders";
                    })
                    .map((a) => {
                        return Object.values(a.data());
                    })
                    .flat();
                // .map((b) => {
                //     return Object.values(b.orders);
                // })
                // .flat();

                setRoutes(data);
            } catch (error) {
                console.log(error);
                window.alert("An error has occured");
            }
        };
        getRoutes();
    }, []);

    useEffect(() => {
        const generateListOfAccounts = () => {
            const routesFilteredbyDates = routes.filter((c) => {
                //FIXME: the route date is conditonal based on the previous way and current way
                let routeDate = c.details.dates ? c.details.dates.routeDate.date : moment(c.details.createdAt).valueOf();
                //FIXME: bug where the date has to subtract 1 day in order to show items that match the start date
                return moment(routeDate).isSameOrAfter(moment(startDate[0]).subtract(1, "days")) && moment(routeDate).isSameOrBefore(endDate[0]);
            });
            const routesFlattenedByOrder = routesFilteredbyDates
                .map((a) => {
                    return Object.values(a.orders);
                })
                .flat();

            const data = customers
                .filter((a) => {
                    // filter the customers by search filter
                    return a.address.includes(searchFilter);
                })
                .map((b) => {
                    // orders filtered by customer to inject into the account
                    const ordersFilterByCustomer = routesFlattenedByOrder.filter((c) => {
                        return c.customer.address == b.address;
                    });
                    // hide accounts that dont contain orders
                    return ordersFilterByCustomer.length > 0 && <Account customer={b} orders={ordersFilterByCustomer} />;
                });

            setAccounts(data);
        };

        routes && generateListOfAccounts();
    }, [routes, searchFilter, startDate[0], endDate[0]]);

    return (
        <Component>
            <MobileNavbar />
            <Header register={register} />
            <DateRange startDate={startDate} endDate={endDate} />
            {accounts}
        </Component>
    );
};

const Component = styled.div`
    background-color: ${colors.greyBackground};
    min-height: 100vh;
`;
export default AccountOverview;
// TODO: check that all maps have keys
// TODO: remove all unneccesary console logs
// TODO: add numerical formatting on numbers
// TODO: move all axctions and state to reducer
// TODO: right now were using the dates of the routes to determine the dates of the order but eventually we should move to determining order dates from the order itself.
