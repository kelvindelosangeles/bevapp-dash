import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/SearchRounded";
import BoltIcon from "@material-ui/icons/OfflineBolt";

const ROControls = props => {
  const [search, setSearch] = props.search;
  const [rapidEntry, setRapidEntry] = props.RapidEntry;

  return (
    <ROControlsWrapper>
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            name="search"
            autoComplete="off"
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value.toUpperCase())}
            onFocus={() => {
              setRapidEntry("");
            }}
          />
        </form>
        {/* <form onSubmit={e => e.preventDefault()}>
          <BoltIcon />
          <input
            type="text"
            placeholder="Enter a Code"
            name="rapidentry"
            value={rapidEntry}
            onChange={e => setRapidEntry(e.target.value.toUpperCase())}
            onFocus={() => {
              setSearch("");
            }}
          />
        </form> */}
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
      padding-left: 24px;
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
