import React, { useRef } from "react";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import SpecialPricesPrintout from "./SpecialPricesPrintout";

const SpecialPricesWrapper = () => {
    const printRef = useRef();
    const customers = useSelector((state) => state.Firestore.data.store.customers);
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    return (
        <Component>
            <div>
                <ReactToPrint trigger={() => <button>Print Special Price List</button>} content={() => printRef.current} />
                <SpecialPricesPrintout ref={printRef} customers={customers} beverages={beverages} />
            </div>
        </Component>
    );
};
export default SpecialPricesWrapper;

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
