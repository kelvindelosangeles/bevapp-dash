import React from "react";
import styled from "styled-components";

const CustomerDetails = props => {
  const { name, address, telephone } = props;
  const formatTel = tel => {
    return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
  };

  return (
    <CustomerDetailsWrapper>
      <div>
        <h3>{name}</h3>
        <p>{address}</p>
        <p>{formatTel(telephone)}</p>
        <p>NYC</p>
      </div>
      <div> Map Image</div>
    </CustomerDetailsWrapper>
  );
};

const CustomerDetailsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  h3 {
    font-family: "AvenirNext-Heavy";
    font-size: 18px;
    margin-bottom: 8px;
    max-width: 210px;
    text-transform: uppercase;
  }
  p {
    font-family: "AvenirNext-Medium";
    font-size: 16px;
    text-transform: uppercase;
  }
`;

export default CustomerDetails;
