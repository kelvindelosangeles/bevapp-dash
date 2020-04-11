import React from "react";
import styled from "styled-components";

const ItemDetails = ({ orderItem }) => {
    const { id, description, price } = orderItem;

    return (
        <ItemDetailsWrapper>
            <div id='logo' />
            <div>
                <p>{id}</p>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </ItemDetailsWrapper>
    );
};

const ItemDetailsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 64px;
    #logo {
        height: 110px;
        width: 110px;
        border-radius: 50%;
        background-color: salmon;
        margin-right: 64px;
    }
    p {
        font-weight: 600;
        margin: 4px 0;
        font-size: 18px;
        text-align: left;
    }
`;

export default ItemDetails;
