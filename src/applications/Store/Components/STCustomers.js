import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { connect } from "react-redux";
import { Order as OrdersModel } from "../../../Models/Order";
import { Delete, Edit, ToggleOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";

const formatTel = (tel) => {
    return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};

const STCustomers = ({ customers }) => {
    const firestore = useFirestore();
    const [customerSearch, setCustomerSearch] = useState("");
    const customerSearchHandler = (e) => {
        setCustomerSearch(e.target.value);
    };
    const disableCustomer = (customer) => {
        window.confirm("Are you sure you want to disable this customer") && console.log(customer);
        firestore
            .update(
                {
                    collection: "store",
                    doc: "customers",
                },
                { [customer.id]: { ...customer, disabled: !customer.disabled } }
            )
            .then(() => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
                alert("Error disableing customer");
            });
    };

    const customersList = Object.values(customers)
        .filter((i) => {
            return i.name && i.address.includes(customerSearch);
        })
        .map((p) => {
            return (
                p.name && (
                    <Xstomer>
                        <p style={{ fontSize: 10, textTransform: "uppercase", color: "red", fontWeight: 800 }}>{p.disabled && "disabled"}</p>
                        <span></span>
                        <span></span>
                        <span></span>
                        <p>{p.alias}</p>
                        <p> {OrdersModel.formatTel(p.telephone)}</p>
                        <Link to={`/store/editcustomer/${p.specialID}`}>
                            <button style={{ color: "black", backgroundColor: "white", borderRadius: 8, padding: 4 }}>{<Edit />}</button>
                        </Link>
                        <button style={{ color: "red", borderRadius: 8, padding: 4 }} onClick={() => disableCustomer(p)}>
                            {<ToggleOff style={{ color: p.disabled ? "red" : "green" }} />}
                        </button>
                    </Xstomer>
                )
            );
        });

    return (
        <CustomersWrapper>
            <CustomerSearch onSubmit={(e) => e.preventDefault()}>
                <input type='text' placeholder='Search' onChange={customerSearchHandler} value={customerSearch} />
            </CustomerSearch>
            <CustomersContainer>{customersList}</CustomersContainer>
        </CustomersWrapper>
    );
};

const CustomersWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
const CustomerSearch = styled.form`
    width: 100%;
    input {
        border-radius: 6px;
        background-color: ${Colors.white};
        border: none;
        width: 100%;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 24px;
        margin-bottom: 24px;
        ::placeholder {
            font-weight: 500;
            color: "#777777";
            font-size: 17px;
        }
    }
`;
const CustomersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    align-content: flex-start;
    border-radius: 4px;
    background-color: ${Colors.white};
    height: 100%;
    width: 100%;
    padding: 24px;
    overflow: scroll;
`;
const Xstomer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto auto;
    grid-column-gap: 16px;
    align-items: center;
    padding: 16px;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid ${Colors.grey};
    p {
        font-weight: 600;
        font-size: 15px;
        text-transform: uppercase;
    }
`;

export default connect((state) => {
    return {
        customers: state.Firestore.ordered.store[0],
    };
})(STCustomers);
