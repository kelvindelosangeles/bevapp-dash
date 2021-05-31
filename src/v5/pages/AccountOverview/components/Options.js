import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
import Switch from "@material-ui/core/Switch";
import { AccountBalanceWalletRounded } from "@material-ui/icons";

const Options = ({ openInvoiceFilter, setOpenInvoiceFilter }) => {
    const openInvoiceFilterHandler = () => {
        setOpenInvoiceFilter((prevState) => {
            return !prevState;
        });
    };

    return (
        <Component>
            <p className='bevapp-module-label'>Options</p>
            <div className='option'>
                <p className='label'>
                    <AccountBalanceWalletRounded />
                    open invoices only
                </p>
                <Switch checked={openInvoiceFilter} onChange={openInvoiceFilterHandler} />
            </div>
        </Component>
    );
};
const Component = styled.div`
    margin: 20px 16px;
    background-color: ${colors.white};
    border-radius: 8px;
    padding: 16px;
    .option {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-column-gap: 24px;
        align-items: center;
        justify-content: space-between;
        p {
            font-weight: 600;
            display: flex;
            align-items: center;
            text-transform: capitalize;

            svg {
                margin-right: 8px;
            }
        }
    }
`;
export default Options;
