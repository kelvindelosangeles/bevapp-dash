import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/SearchRounded";
import BoltIcon from "@material-ui/icons/OfflineBolt";

const ROControls = () => {
  return (
    <ROControlsWrapper>
      <div>
        <form>
          <SearchIcon />
          <input type="text" />
        </form>
        <form>
          <BoltIcon />
          <input type="text" />
        </form>
      </div>
    </ROControlsWrapper>
  );
};

const ROControlsWrapper = styled.div`
  grid-area: rocontrols;

  div {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 64px 32px;
  }
  form {
    display: flex;
    align-items: center;
    :first-of-type {
      flex: 1;
      padding-right: 24px;
      input {
        width: 100%;
      }
    }
    input {
      height: 40px;
      border-radius: 4px;
      border: none;
      outline: none;
    }
    svg {
      margin-right: 24px;
      font-size: 32px;
    }
  }
`;
export default ROControls;
