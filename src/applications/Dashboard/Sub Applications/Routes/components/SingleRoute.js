import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import RoutePreview from "./RoutePreview";
const SingleRoute = () => {
    const [open, toggle] = useState(false);

    return (
        <React.Fragment>
            <Component className='item' onClick={() => toggle(true)}>
                <p>Danny P.</p>
                <p>14</p>
                <p>32</p>
                <p>$5647.23</p>
                <p>New Order</p>
            </Component>
            <Dialog open={open} onClose={() => toggle(false)} scroll='paper' onBackdropClick={() => toggle(false)}>
                <RoutePreview />
            </Dialog>
        </React.Fragment>
    );
};
const Component = styled.div``;

export default SingleRoute;
