import React from "react";
import styled from "styled-components";

import SpinnerGif from "../../Assets/Spinner/Spinner.gif";

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <img src={SpinnerGif} alt="" />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;
