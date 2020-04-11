import React from "react";
import styled from "styled-components";

const CustomerDetails = (props) => {
    const { name, address, telephone, gridArea } = props;
    const formatTel = (tel) => {
        return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
    };

    return (
        <Container gridArea={gridArea}>
            <div>
                <h3>{name}</h3>
                <p>{address}</p>
                <p>{formatTel(telephone)}</p>
                <p>NYC</p>
            </div>
        </Container>
    );
};

const Container = styled.section`
    grid-area: ${(props) => props.gridArea};
    display: flex;
    justify-content: space-between;
    padding: 32px;
    h3 {
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 4px;
        text-transform: uppercase;
    }
    p {
        font-weight: 500;
        font-size: 16px;
        text-transform: uppercase;
    }
`;

export default CustomerDetails;
