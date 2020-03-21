import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import GoBack from "../Components/GoBack";

import { Brands as brandsList } from "../../../Assets/Data/Brands";
import { Packaging as PackagingList } from "../../../Assets/Data/Packaging";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

const AddBeverage = props => {
  const [itemID, setItemID] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [packaging, setPackaging] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = e => {
    if (itemID.includes(".")) {
      alert(
        "If the Item ID contains a decimal point, please contact the administrator to add this item manually for you."
      );
    } else {
      if (props.inventory[itemID] !== undefined) {
        alert(
          "The Item you are trying to add already exists in the store.  If you would like to make changes, please go to edit item by clicking on an item on the left"
        );
        setItemID("");
      } else {
        if (isNaN(Number(price))) {
          alert("The Price must be a number in this format 34.99");
          setPrice("");
        } else {
          return (
            itemID !== "" &&
            brand &&
            category &&
            packaging &&
            description !== "" &&
            size !== "" &&
            price !== "" &&
            props.firestore
              .update(
                {
                  collection: "inventory",
                  doc: "beverages"
                },
                {
                  [itemID]: {
                    brand,
                    id: itemID,
                    category,
                    description,
                    packaging,
                    size,
                    price
                  }
                }
              )
              .then(() => {
                console.log("success");
                props.history.push("/store/home");
              })
              .catch(e => {
                console.log(e);
                alert(e);
              })
          );
        }
      }
    }
  };

  const brandOptions = () => {
    let brands = brandsList.map(i => i[0]);
    brands = [...new Set(brands)].map(i => {
      return <option value={i}> {i.toUpperCase()} </option>;
    });
    return brands;
  };
  const CategoryOptions = () => {
    let brands = brandsList.map(i => i[1]);
    brands = [...new Set(brands)].map(i => {
      return <option value={i}> {i.toUpperCase()} </option>;
    });
    return brands;
  };
  const PackagingOptions = () => {
    return PackagingList.map(i => {
      return <option value={i}> {i.toUpperCase()} </option>;
    });
  };

  return (
    <AddBeverageWrapper>
      <GoBack to={"/store"} />
      <Label>
        <p>Add a New Beverage</p>
      </Label>
      <Form onSubmit={submitHandler}>
        <div style={{ gridArea: "a" }}>
          <p>Item ID</p>
          <input
            type="text"
            required
            value={itemID}
            onChange={e => {
              setItemID(e.target.value.toUpperCase());
            }}
          />
        </div>
        <div style={{ gridArea: "b" }}>
          <p>Brand</p>
          <select
            required
            type="text"
            defaultValue={null}
            onChange={e => {
              setBrand(e.target.value);
            }}
          >
            <option value={null}></option>
            {brandOptions()}
          </select>
        </div>
        <div style={{ gridArea: "c" }}>
          <p>Category</p>
          <select
            required
            type="text"
            defaultValue={null}
            onChange={e => {
              setCategory(e.target.value);
            }}
          >
            <option defaultValue={null}></option>
            {CategoryOptions()}
          </select>
        </div>
        <div style={{ gridArea: "e" }}>
          <p>Description</p>
          <input
            required
            type="text"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div style={{ gridArea: "d" }}>
          <p>Packaging</p>
          <select
            required
            type="text"
            defaultValue={null}
            onChange={e => {
              setPackaging(e.target.value);
            }}
          >
            <option defaultValue={null}></option>
            {PackagingOptions()}
          </select>
        </div>
        <div style={{ gridArea: "f" }}>
          <p>Size</p>
          <input
            required
            type="text"
            value={size}
            onChange={e => {
              setSize(e.target.value);
            }}
          />
        </div>
        <div style={{ gridArea: "g" }}>
          <p>Price</p>
          <input
            required
            type="text"
            value={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <button style={{ gridArea: "h" }}>Submit</button>
      </Form>
    </AddBeverageWrapper>
  );
};

const AddBeverageWrapper = styled.div`
  grid-area: preview;
  height: 100%;
  width: 100%;
  background-color: ${Colors.white};
  padding: 0 16px;
`;

const Label = styled.div`
  padding: 40px 0;
  width: 100%;
  margin-bottom: 40px;
  p {
    font-family: AvenirNext-Bold;
    font-size: 24px;
    text-align: center;
  }
`;
const Form = styled.form`
  display: grid;
  grid-gap: 24px 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "a b"
    "c d"
    "e e"
    "f g"
    "h h";
  p {
    margin-bottom: 8px;
    font-family: AvenirNext-Dembold;
    font-size: 16px;
    color: #000000;
  }
  input,
  select {
    height: 56px;
    width: 100%;
    padding: 16px 8px;
    border: none;
    border-radius: 4px;
    background-color: ${Colors.lightGrey};
    -webkit-appearance: none;
  }
  button {
    padding: 18px 0;
    border-radius: 4px;
    background-color: ${Colors.green};
    font-family: AvenirNext-Bold;
    font-size: 16px;
    color: ${Colors.white};
  }
`;

export default compose(
  firestoreConnect(),
  connect(state => {
    return {
      inventory: state.Firestore.ordered.inventory[0]
    };
  })
)(withRouter(AddBeverage));
