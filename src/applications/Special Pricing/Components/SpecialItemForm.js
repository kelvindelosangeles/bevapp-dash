import React from "react";
import styled from "styled-components";
import { Order as OrdersModel } from "../../../Models/Order";

import ActiveIcon from "@material-ui/icons/CheckCircleRounded";
import InactiveIcon from "@material-ui/icons/RadioButtonUncheckedRounded";

const SpecialItemForm = ({
  specialPrice,
  beverages,
  toggleActiveState,
  onChange,
  state
}) => {
  return (
    <React.Fragment>
      <p>{specialPrice.id}</p>
      <p>$ {beverages[specialPrice.id].price}</p>
      <SPInput
        type="number"
        name={specialPrice.id}
        onChange={onChange}
        value={state[specialPrice.id].price}
        min={0}
        max={100}
      />
      <p>
        ${" "}
        {OrdersModel.CalcMargin(
          beverages[specialPrice.id].price,
          specialPrice.price
        )}
      </p>
      <p>{specialPrice.date}</p>
      {specialPrice.active ? (
        <ActiveIcon onClick={() => toggleActiveState(specialPrice.id)} />
      ) : (
        <InactiveIcon onClick={() => toggleActiveState(specialPrice.id)} />
      )}
    </React.Fragment>
  );
};

const SPInput = styled.input`
  font-family: Poppins;
  font-size: 16px;
  max-width: 106px;
  border: none;
  margin-bottom: 8px;
`;

export default SpecialItemForm;
