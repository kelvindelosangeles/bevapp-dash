import { colors, Dialog, Switch } from "@material-ui/core";
import { Users } from "phosphor-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
const Settings = () => {
    const dispatch = useDispatch();
    const firestore = useFirestore();

    const open = useSelector((state) => state.GlobalState.settingsOpen);
    const uid = useSelector((state) => state.Firebase.auth.uid);
    const showCost = useSelector((state) => state.Firebase.profile.showCost);

    const showCostHandler = () => {
        firestore
            .update(
                {
                    collection: "users",
                    doc: uid,
                },
                { showCost: !showCost }
            )
            .then(() => {
                console.log("success");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Dialog open={open} scroll='paper' onClose={() => dispatch({ type: "TOGGLE_SETTINGS" })}>
            <Component>
                <header>
                    <p>Settings</p>
                </header>
                <section>
                    <p className='title'>Rapid Order</p>
                    <div className='setting'>
                        <p className='label'>Show Cost</p>
                        <Switch checked={showCost} onChange={showCostHandler} />
                    </div>
                </section>
            </Component>
        </Dialog>
    );
};
const Component = styled.div`
    padding: 24px;
    min-width: 400px;
    header {
        margin-bottom: 24px;
        p {
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
        }
    }
    section {
        display: grid;
        grid-row-gap: 4px;
        .title {
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 600;
            color: black;
            border-bottom: 1px solid grey;
            padding-bottom: 4px;
        }
        .setting {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`;
export default Settings;
