import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/SearchRounded";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import BoltIcon2 from "@material-ui/icons/LinearScaleRounded";
import { connect } from "react-redux";

const ROControls = props => {
  const [search, setSearch] = props.search;
  const [rapidEntry, setRapidEntry] = props.RapidEntry;
  const [smartEntryID, setSmartEntryID] = props.SmartEntryID;
  const [SmartEntryQty, setSmartEntryQty] = props.SmartEntryQty;

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
      if (props.store[ID] === undefined) {
        // if it doesnt throw an item doesnt exist error because the format is correct
        setRapidEntry("");
        console.log(ID);
        window.alert("That item does not exist");
      } else {
        // if it is add the item to the cart
        setRapidEntry("");
        console.log(props.store[ID]);
        props.dispatch({
          type: "ADD_TO_CART",
          item: { ...props.store[ID], qty }
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
        <form onSubmit={rapidEntrySubmitHandler} className="smart-entry">
          <BoltIcon2 />
          <input
            className="seqty"
            type="text"
            placeholder="34-AMS12B"
            autoComplete="off"
            name="rapidentry"
            value={rapidEntry}
            onChange={rapidEntryChangeHandler}
            onFocus={() => {
              setSearch("");
              setRapidEntry("");
            }}
          />
          <input
            className="seid"
            type="text"
            placeholder="34-AMS12B"
            autoComplete="off"
            name="rapidentry"
            value={rapidEntry}
            onChange={rapidEntryChangeHandler}
            onFocus={() => {
              setSearch("");
              setRapidEntry("");
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
    :nth-of-type(2) {
      padding-right: 24px;
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
  .smartEntry {
  }
`;

export default connect(state => {
  return { store: state.Firestore.data.inventory.beverages };
})(ROControls);
