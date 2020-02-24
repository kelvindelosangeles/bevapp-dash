import React, { useRef } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/SearchRounded";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import BoltIcon2 from "@material-ui/icons/LinearScaleRounded";
import { connect } from "react-redux";
import { useEffect } from "react";

const ROControls = props => {
  const seid = useRef();
  const seqty = useRef();
  const [search, setSearch] = props.search;
  const [smartEntryID, setSmartEntryID] = props.SmartEntryID;
  const [smartEntryQty, setSmartEntryQty] = props.SmartEntryQty;

  useEffect(() => {
    seid.current.focus();
  }, []);

  const smartEntryQtyChangeHandler = e => {
    smartEntryQty.length > 2
      ? setSmartEntryQty(smartEntryQty.slice(0, 2))
      : setSmartEntryQty(e.target.value);
  };
  const smartEntryIDChangeHandler = e => {
    smartEntryID.length > 4 && seqty.current.focus();
    setSmartEntryID(e.target.value.toUpperCase());
  };
  const smartEntrySubmitHandler = e => {
    e.preventDefault();
    try {
      if (smartEntryQty !== "") {
        if (props.store[smartEntryID] === undefined) {
          // if it doesnt throw an item doesnt exist error because the format is correct
          setSmartEntryID("");
          setSmartEntryQty("");
          seid.current.focus();
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
            seid.current.focus();
            return props.dispatch({
              type: "ADD_TO_CART",
              item: { ...props.store[smartEntryID], qty: smartEntryQty }
            });
          }
        }
      } else {
        alert("Please Enter a Quantity");
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
          />
        </form>

        <form onSubmit={smartEntrySubmitHandler} className="smart-entry">
          <BoltIcon2 />
          <input
            ref={seid}
            className="seid"
            type="text"
            placeholder="AMS12B"
            autoComplete="off"
            name="rapidentry"
            value={smartEntryID}
            onChange={smartEntryIDChangeHandler}
          />
          <input
            ref={seqty}
            className="seqty"
            type="number"
            min="1"
            max="999"
            placeholder="34"
            autoFocus
            value={smartEntryQty}
            onChange={smartEntryQtyChangeHandler}
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
      padding: 0 24px;
    }
    .seid {
      margin-right: 16px;
    }
  }
`;

export default connect(state => {
  return { store: state.Firestore.data.inventory.beverages };
})(ROControls);
