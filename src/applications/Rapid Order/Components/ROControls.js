import React, { useRef } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/SearchRounded";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import BoltIcon2 from "@material-ui/icons/LinearScaleRounded";
import { connect } from "react-redux";
import { useEffect } from "react";

const ROControls = props => {
  const seqty = useRef();
  const [search, setSearch] = props.search;
  const [rapidEntry, setRapidEntry] = props.RapidEntry;
  const [smartEntryID, setSmartEntryID] = props.SmartEntryID;
  const [smartEntryQty, setSmartEntryQty] = props.SmartEntryQty;

  useEffect(() => {
    seqty.current.focus();
  }, [smartEntryQty]);

  const rapidEntryChangeHandler = e => {
    setRapidEntry(e.target.value);
  };
  const smartEntryQtyChangeHandler = e => {
    smartEntryQty.length > 2
      ? setSmartEntryQty(smartEntryQty.slice(0, 2))
      : setSmartEntryQty(e.target.value);
  };
  const smartEntryIDChangeHandler = e => {
    setSmartEntryID(e.target.value.toUpperCase());
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
        // check if the item has flavors if so default to flavors modal
        if (props.store[ID].hasOwnProperty("flavors")) {
          console.log("this item has flavors");
          setRapidEntry("");
          props.dispatch({ type: "TOGGLE_ATCF", item: props.store[ID] });
          // if it is add the item to the cart
        } else {
          setRapidEntry("");
          console.log(props.store[ID]);
          props.dispatch({
            type: "ADD_TO_CART",
            item: { ...props.store[ID], qty }
          });
        }
      }
      // any other errors and throw an error and clear the cart
      // Most likely a formating error
    } catch (err) {
      setRapidEntry("");
      console.log(err);
      window.alert("Incorrect Format");
    }
  };

  const smartEntrySubmitHandler = e => {
    e.preventDefault();
    console.log(smartEntryQty + smartEntryID);

    try {
      if (props.store[smartEntryID] === undefined) {
        // if it doesnt throw an item doesnt exist error because the format is correct
        setSmartEntryID("");
        setSmartEntryQty("");
        console.log(smartEntryID);
        return window.alert("That item does not exist");
      } else {
        if (props.store[smartEntryID].hasOwnProperty("flavors")) {
          console.log("this item has flavors");
          setSmartEntryID("");
          setSmartEntryQty("");
          props.dispatch({
            type: "TOGGLE_ATCF",
            item: props.store[smartEntryID]
          });
          // if it is add the item to the cart
        } else {
          console.log(props.store[smartEntryID]);
          setSmartEntryID("");
          setSmartEntryQty("");
          return props.dispatch({
            type: "ADD_TO_CART",
            item: { ...props.store[smartEntryID], qty: smartEntryQty }
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSmartEntryID("");
      setSmartEntryQty("");
      window.alert("Formating Error");
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

        <form onSubmit={smartEntrySubmitHandler} className="smart-entry">
          <BoltIcon2 onClick={smartEntrySubmitHandler} />
          <input
            className="seqty"
            ref={seqty}
            type="number"
            min="1"
            max="999"
            placeholder="34"
            autoFocus
            value={smartEntryQty}
            onChange={smartEntryQtyChangeHandler}
            onFocus={() => {
              setSearch("");
              setRapidEntry("");
            }}
          />
          <input
            className="seid"
            type="text"
            placeholder="AMS12B"
            autoComplete="off"
            name="rapidentry"
            value={smartEntryID}
            onChange={smartEntryIDChangeHandler}
            onFocus={() => {
              setSearch("");
              setRapidEntry("");
            }}
          />
          <button style={{ display: "none" }} type="submit"></button>
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
      margin-right: 16px;
      font-size: 32px;
    }
  }
  .smart-entry {
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    .seqty {
      -webkit-appearance: none;
      margin-right: 16px;
      padding: 0 24px;
    }
  }
`;

export default connect(state => {
  return { store: state.Firestore.data.inventory.beverages };
})(ROControls);
