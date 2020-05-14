import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { useEffect } from "react";
const Test = ({ firestore }) => {
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    // Object.values(beverages)
    //     // .sort((a, b) => {
    //     //     // console.log(a.section);
    //     //     return Number(a.section) > Number(b.section) ? -1 : 1;
    //     // })
    //     .map((i) => {
    //         i.section && console.log(`ID: ${i.id} section: ${i.section} - subsection: ${i.subSection}`);
    //     });

    const filtered = Object.values(beverages).filter((a) => {
        return a.hasOwnProperty("section") && a.hasOwnProperty("subSection");
    });

    let filteredTable = filtered.map((a) => {
        return {
            id: a.id,
            section: a.section,
            subSection: a.subSection,
        };
    });

    console.table(
        filteredTable.sort((a, b) => {
            if (a.section > b.section) return 1;
            if (a.section < b.section) return -1;
            if (a.subSection > b.subSection) return 1;
            if (a.subSection < b.subSection) return -1;
        })
    );

    // useEffect(() => {
    //     Object.values(beverages).forEach((i) => {
    //         // let section = "2";
    //         let subSection = "b";
    //         let action = () => {
    //             firestore
    //                 .update(
    //                     {
    //                         collection: "inventory",
    //                         doc: "beverages",
    //                     },
    //                     { [i.id]: { ...i, subSection } }
    //                 )
    //                 .then(() => {
    //                     console.log("success" + i.id);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     console.log("error" + i.id);
    //                 });
    //         };

    //         i.subSection && i.subSection === "B" && console.log({ [i.id]: { ...i, subSection } });
    //         i.subSection && i.subSection === "B" && action();
    //     });
    // }, []);

    return <Component>This is the test page</Component>;
};
const Component = styled.div``;
export default withFirestore(Test);
