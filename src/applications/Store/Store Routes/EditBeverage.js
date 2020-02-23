import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import GoBack from "../Components/GoBack";

import { Brands as brandsList } from "../../../Assets/Data/Brands";
import { Packaging as PackagingList } from "../../../Assets/Data/Packaging";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

const EditBeverage = props => {
  const [itemID, setItemID] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [packaging, setPackaging] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    let item = props.inventory[props.match.params.id];
    setItemID(item.id);
    setBrand(item.brand);
    setCategory(item.category);
    setDescription(item.description);
    setPackaging(item.packaging);
    setSize(item.size);
    setPrice(item.price);
  }, [props.match.params.id]);
  console.log(props.inventory[props.match.params.id]);

  const submitHandler = e => {
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
        })
    );
  };

  const deleteHandler = () => {
    const {
      [itemID]: removed,
      ["id"]: omit,
      ...updatedInventory
    } = props.inventory;
    window.confirm(`Are you sure you would like to delete ${itemID}`) &&
      itemID !== "" &&
      brand &&
      category &&
      packaging &&
      description !== "" &&
      size !== "" &&
      price !== "" &&
      props.firestore
        .set(
          {
            collection: "inventory",
            doc: "beverages"
          },
          updatedInventory
        )
        .then(() => {
          console.log("success");
          props.history.push("/store/home");
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
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
    <EditBeverageWrapper>
      <GoBack to={"/store"} />
      <Label>
        <p>Edit Beverage</p>
      </Label>
      <Form onSubmit={submitHandler}>
        <div style={{ gridArea: "a" }}>
          <p>Item ID</p>
          <input
            type="text"
            disabled
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
            value={brand}
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
            value={category}
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
            value={packaging}
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
            disabled
            type="text"
            value={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <button style={{ gridArea: "h" }} type="submit">
          Submit
        </button>
        <button style={{ gridArea: "i" }} type="button" onClick={deleteHandler}>
          Delete
        </button>
      </Form>
    </EditBeverageWrapper>
  );
};

const EditBeverageWrapper = styled.div`
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
    "h i";
  p {
    margin-bottom: 8px;
    font-family: AvenirNext-Dembold;
    font-size: 16px;
    color: #000000;
  }
  input,
  select {
    height: 45px;
    width: 100%;
    padding: 16px 8px;
    border: none;
    border-radius: 4px;
    background-color: ${Colors.lightGrey};
    font-family: AvenirNext-Demibold;
    font-size: 14px;
  }
  button {
    padding: 16px 0;
    border-radius: 4px;
    background-color: ${Colors.green};
    font-family: AvenirNext-Bold;
    font-size: 16px;
    color: ${Colors.white};
    cursor: pointer;
    :last-of-type {
      background-color: ${Colors.red};
    }
  }
`;

export default compose(
  firestoreConnect(),
  connect(state => {
    return {
      inventory: state.Firestore.data.inventory.beverages
    };
  })
)(withRouter(EditBeverage));
