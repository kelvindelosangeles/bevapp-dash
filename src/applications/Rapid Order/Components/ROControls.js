import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/SearchRounded";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import { connect } from "react-redux";
import { Store } from "../../../Assets/Data/Store";

const ROControls = props => {
  const [search, setSearch] = props.search;
  const [rapidEntry, setRapidEntry] = props.RapidEntry;

  const rapidEntryChangeHandler = e => {
    setRapidEntry(e.target.value);
  };
  const rapidEntrySubmitHandler = e => {
    e.preventDefault();

    try {
      // Create the id and the quantity
      let qty = rapidEntry.slice(0, 3).split("-")[0];
      let ID = rapidEntry.split("-")[1].toUpperCase();

      // if theres no error then check if that store item exists
      if (Store[ID] === undefined) {
        // if it doesnt throw an item doesnt exist error because the format is correct
        setRapidEntry("");
        console.log(ID);
        window.alert("That item does not exist");
      } else {
        // if it is add the item to the cart
        setRapidEntry("");
        console.log(Store[ID]);
        props.dispatch({
          type: "ADD_TO_CART",
          item: { ...Store[ID], qty }
        });
      }
      // any other errors and throw an error and clear the cart
      // Most likely a formating error
    } catch (err) {
      setRapidEntry("");
      console.log(err);
      window.alert("Incorrect Format");
    }
  };

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
        <form onSubmit={rapidEntrySubmitHandler}>
          <BoltIcon />
          <input
            type="text"
            placeholder="34-AMS12B"
            autoComplete="off"
            name="rapidentry"
            value={rapidEntry}
            onChange={rapidEntryChangeHandler}
            onFocus={() => {
              setSearch("");
            }}
          />
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

export default connect()(ROControls);
