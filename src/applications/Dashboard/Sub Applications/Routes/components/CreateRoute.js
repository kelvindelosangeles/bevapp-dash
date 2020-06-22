import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Drivers } from "../../../../../Assets/Data/Drivers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MiniOrder from "../../../Components/MiniOrder";
import { Colors } from "../../../../../Constants/Colors";
import { Popover } from "@material-ui/core";
import OptionsIcon from "@material-ui/icons/BlurCircularRounded";

const CreateRoute = () => {
    const [driver, setDriver] = useState(null);
    const [open, setOpen] = useState(false);

    const anchor = useRef();
    const changeHandler = (e, value) => {
        setDriver(value);
    };

    return (
        <Component>
            <div className='heading'>New Route</div>
            <Autocomplete
                options={Drivers}
                getOptionLabel={(option) => option.firstName}
                renderInput={(params) => <TextField {...params} label='Select a Driver' variant='standard' />}
                onChange={changeHandler}
                value={driver}
                autoComplete={false}
            />
            {driver && (
                <React.Fragment>
                    <Body>
                        <div className='subheading'>Add Orders to your Route</div>
                        <MiniOrder style={{ cursor: "pointer" }} />
                        <MiniOrder />
                        <MiniOrder />
                        <MiniOrder />
                    </Body>
                    <OptionsIcon id='options-icon' onClick={() => setOpen(true)} ref={anchor} />
                </React.Fragment>
            )}
            <Popover
                open={open}
                anchorEl={anchor.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <Menu>
                    <p className='pdf'>pdf Link</p>
                    <p className='edit'>Edit Order</p>
                    <p className='delete'>Delete Order</p>
                </Menu>
            </Popover>
        </Component>
    );
};
const Component = styled.div`
    padding: 32px;
    position: relative;
    #options-icon {
        position: absolute;
        top: 16px;
        right: 24px;
        color: ${Colors.black};
        cursor: pointer;
    }
    .heading {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 32px;
    }
    .MuiFormControl-root.MuiTextField-root {
        width: 40% !important;
        margin-bottom: 40px;
        /* FIXME: Figure out why i have to do this */
    }
`;

const Body = styled.div`
    .subheading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 32px;
    }
`;

const Menu = styled.div`
    display: grid;
    p {
        padding: 16px 32px;
        font-size: 16px;
        font-weight: 600;
        border: 1px solid ${Colors.lightGrey};
        cursor: pointer;
    }
    .edit {
        :hover {
            background-color: ${Colors.yellow};
        }
    }
    .delete {
        :hover {
            background-color: ${Colors.red};
            color: ${Colors.white};
        }
    }
`;
export default CreateRoute;
