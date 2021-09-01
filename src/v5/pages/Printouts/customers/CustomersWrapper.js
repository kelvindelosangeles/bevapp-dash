import React, { useRef } from "react";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import CustomersPrintout from "./CustomersPrintout";
import { useSelector } from "react-redux";

const CustomersWrapper = () => {
    const printRef = useRef();
    const customers = useSelector((state) => state.Firestore.data.store.customers);

    return (
        <Component>
            <div>
                <ReactToPrint trigger={() => <button>Print Customer List</button>} content={() => printRef.current} />
                <CustomersPrintout ref={printRef} customers={customers} />
            </div>
        </Component>
    );
};
const Component = styled.div`
    button {
        padding: 16px 32px;
        margin: 16px;
        font-size: 16px;
        font-weight: bold;
        background-color: white;
        color: black;
        border-radius: 8px;
    }
`;
export default CustomersWrapper;
