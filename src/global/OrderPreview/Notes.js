import React from "react";
import styled from "styled-components";

const Notes = props => {
  return (
    <Container>
      <h3>Notes</h3>
      {props.text}
    </Container>
  );
};

const Container = styled.section`
  padding: 32px;
  h3 {
    font-size: 18px;
    font-family: Poppins;
    font-weight: 500;
    margin-bottom: 16px;
  }
  font-family: Poppins;
  font-weight: 400;

  font-size: 16px;
`;
export default Notes;
