import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { useEffect } from "react";
import moment from "moment";
const Test = ({ firestore }) => {
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);
    const orders = useSelector((state) => state.Firestore.data.orders.orders);
    const withoutSection = Object.values(beverages).filter((a) => {
        return !a.hasOwnProperty("section") && !a.hasOwnProperty("subSection");
    });
    const withSection = Object.values(beverages).filter((a) => {
        return a.hasOwnProperty("section") && a.hasOwnProperty("subSection");
    });
    const itemsToUpdate = withoutSection.filter((i) => {
        return i.id;
    });
    const checkForItemsWithoutSection = () => {
        console.table(
            withoutSection
                .map((i) => {
                    return i.id && { number: i.description && i.id.replace(/\D+/g, ""), id: i.id };
                })
                .sort((a, b) => {
                    return a.number > b.number ? 1 : -1;
                })
        );
    };
    const beveragesOrdered = () => {
        console.table(
            Object.values(beverages)
                .sort((a, b) => {
                    // if (b.section == undefined) return -1;
                    // return a.section - b.section;
                    return a.section > b.section && a.subSection > b.subSection && a.section !== undefined ? -1 : 1;
                })

                .map((i) => {
                    return {
                        sec: i.section || "none",
                        sub: i.subSection || "none",
                        id: i.id,
                    };
                })
        );
    };

    const section1 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "1";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const section2 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "2";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const section3 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "3";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const section4 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "4";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const section5 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "5";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const section6 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "6";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const section7 = Object.values(beverages)
        .filter((i) => {
            return i.section && i.section === "7";
        })
        .sort((a, b) => {
            return a.subSection < b.subSection ? -1 : 1;
        });
    const sectionNone = Object.values(beverages).filter((i) => {
        return !i.section;
    });
    // console.table([section1, section2, section3, section4, section5, section6, section7, sectionNone].flat());

    // console.log(itemsToUpdate);

    // useEffect(() => {
    //     itemsToUpdate.forEach((i) => {
    //         let section = "7";
    //         let subSection = "j";
    //         let action = () => {
    //             firestore
    //                 .update(
    //                     {
    //                         collection: "inventory",
    //                         doc: "beverages",
    //                     },
    //                     { [i.id]: { ...i, section, subSection } }
    //                 )
    //                 .then(() => {
    //                     console.log("success " + i.id);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     console.log("There was an error with ", i.id);
    //                 });
    //         };

    //         action();
    //     });
    // }, []);

    console.log(moment(Object.values(orders)[1].details.createdAt));

    return <Component>This is the test page</Component>;
};
const Component = styled.div`
    padding: 32px;
`;
export default withFirestore(Test);
