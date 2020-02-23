import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const STBeverages = props => {
  const [beverageSearch, SetBeverageSearch] = useState("");

  const beverageSearchHandler = e => {
    SetBeverageSearch(e.target.value.toUpperCase());
  };

  const beveragesList = Object.values(props.beverages)
    .filter(i => {
      return (
        (i.brand && i.description.includes(beverageSearch)) ||
        (i.brand && i.id.includes(beverageSearch) && i)
      );
    })
    .map(x => {
      return (
        <Link to={`/store/editbeverage/${x.id}`}>
          <ItemWrapper>
            <div></div>
            <h5>{x.description}</h5>
          </ItemWrapper>
        </Link>
      );
    });

  return (
    <STBeveragesWrspper>
      <BeverageSearch action="">
        <input
          type="text"
          placeholder="Search"
          onChange={beverageSearchHandler}
          value={beverageSearch}
        />
      </BeverageSearch>
      <div className="test">{beveragesList}</div>
    </STBeveragesWrspper>
  );
};

const STBeveragesWrspper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  a {
    text-decoration: none;
    color: ${Colors.black};
  }
  .test {
    padding: 24px 0px 24px 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
    align-content: flex-start;
    overflow: scroll;
  }
`;

const BeverageSearch = styled.form`
  width: 100%;
  input {
    border-radius: 6px;
    background-color: ${Colors.white};
    border: none;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    margin-bottom: 24px;
    ::placeholder {
      font-family: "AvenirNext-Medium";
      color: "#777777";
      font-size: 17px;
    }
  }
`;

const ItemWrapper = styled.div`
  background-color: ${Colors.white};
  min-height: 130px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px rgba(179, 179, 179, 0.25);
  cursor: pointer;

  div {
    height: 50px;
    width: 50px;
    background-color: salmon;
    border-radius: 50%;
    margin-bottom: 16px;
  }
  h5 {
    font-family: "AvenirNext-Demibold";
    font-size: 12px;
    text-align: center;
    margin-bottom: 4px;
    text-transform: capitalize;
  }
  p {
    font-family: "AvenirNext-Medium";
    font-size: 12px;
  }
`;

export default connect(state => {
  return {
    beverages: state.Firestore.data.inventory.beverages
  };
})(STBeverages);
