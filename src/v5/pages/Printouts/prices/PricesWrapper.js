import React, { useRef } from "react";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import PricesPrintout from "./PricesPrintout";

const PricesWrapper = () => {
    const printRef = useRef();
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    return (
        <Component>
            <div>
                <ReactToPrint trigger={() => <button>Print Price List</button>} content={() => printRef.current} />
                <PricesPrintout ref={printRef} beverages={beverages} />
            </div>
        </Component>
    );
};
export default PricesWrapper;

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
