import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { Brands as brandsList } from "../../../Assets/Data/Brands";
import { Packaging as PackagingList } from "../../../Assets/Data/Packaging";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import BackIcon from "@material-ui/icons/ArrowBackRounded";

const EditBeverage = (props) => {
    const [itemID, setItemID] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [packaging, setPackaging] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [flavors, setFlavors] = useState(null);
    const [newFlavor, setNewFlavor] = useState(null);
    let item = props.inventory[props.match.params.id];
    const [hasFlavors, setHasFlavors] = useState(false);

    useEffect(() => {
        setItemID(item.id);
        setBrand(item.brand);
        setCategory(item.category);
        setDescription(item.description);
        setPackaging(item.packaging);
        setSize(item.size);
        setPrice(item.price);
        setHasFlavors(item.hasOwnProperty("flavors"));
        item.hasOwnProperty("flavors") ? setFlavors([...item.flavors]) : setFlavors(null);
    }, [props.match.params.id]);

    useEffect(() => {
        flavors && flavors.length < 1 && setHasFlavors(false);
    }, [flavors]);

    useEffect(() => {
        !hasFlavors && setFlavors(null);
    }, [hasFlavors]);

    const submitHandler = (e) => {
        e.preventDefault();
        // The Logic is currently working but i can clean this up
        // perhaps solve this with a big try catch
        const itemWithFlavors = {
            [itemID]: {
                ...item,
                brand,
                id: itemID,
                category,
                description,
                packaging,
                size,
                price,
                flavors,
            },
        };
        const itemWithoutFlavors = {
            [itemID]: {
                brand,
                category,
                description,
                id: itemID,
                packaging,
                price,
                size,
            },
        };
        let updatedItem = hasFlavors && flavors && flavors.length > 0 ? itemWithFlavors : itemWithoutFlavors;

        return (
            window.confirm("Are you sure you want to make these changes?") &&
            props.firestore
                .update(
                    {
                        collection: "inventory",
                        doc: "beverages",
                    },
                    updatedItem
                )
                .then(() => {
                    console.log("success");
                    props.history.push("/store/home");
                })
                .catch((e) => {
                    console.log(e);
                })
        );
    };
    const deleteHandler = (e) => {
        e.preventDefault();
        alert("Delete has been temporarily disabled.  If you need to make a change to this item please submit an edit or contact administrator.");
        // const { [itemID]: removed, ["id"]: omit, ...updatedInventory } = props.inventory;
        // FIXME: Delete Disabled
        // window.confirm(`Are you sure you would like to delete ${itemID}`) &&
        //     props.firestore
        //         .set(
        //             {
        //                 collection: "inventory",
        //                 doc: "beverages",
        //             },
        //             updatedInventory
        //         )
        //         .then(() => {
        //             console.log("success");
        //             props.history.push("/store/home");
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             alert(err);
        //         });
    };
    const brandOptions = () => {
        let brands = brandsList.map((i) => i[0]);
        brands = [...new Set(brands)].map((i) => {
            return <option value={i}> {i.toUpperCase()} </option>;
        });
        return brands;
    };
    const CategoryOptions = () => {
        let brands = brandsList.map((i) => i[1]);
        brands = [...new Set(brands)].map((i) => {
            return <option value={i}> {i.toUpperCase()} </option>;
        });
        return brands;
    };
    const PackagingOptions = () => {
        return PackagingList.map((i) => {
            return <option value={i}> {i.toUpperCase()} </option>;
        });
    };
    const removeFlavor = (x) => {
        let filteredFlavors = flavors.filter((f, index) => {
            return index !== x;
        });
        window.confirm(`Are you sure you want to delete the ${flavors[x]} flavor `) && setFlavors(filteredFlavors);
    };
    const flavorsMapped = () => {
        try {
            return flavors.map((f, index) => {
                return <Chip onDelete={() => removeFlavor(index)} label={f} color='primary' />;
            });
        } catch (error) {
            return;
        }
    };
    const addFlavorHandler = () => {
        const oldFlavors = flavors ? flavors : [];

        !newFlavor ? alert("Please enter a new flavor then click add") : setFlavors([...oldFlavors, newFlavor]);
        setNewFlavor("");
    };
    const cancleHandler = () => {
        window.confirm("Are you sure you want to cancel these changes?") && props.history.push("/store/home");
    };

    return (
        <Container>
            <div className='wrapper'>
                <header>
                    <p className='back-button' onClick={cancleHandler}>
                        <BackIcon /> Go Back
                    </p>
                    <p className='page-title'>Edit Beverage</p>
                </header>

                {flavors && (
                    <FlavorsContainer>
                        <p className='title'>Flavors</p>
                        <div className='grid'>{flavorsMapped()}</div>
                    </FlavorsContainer>
                )}

                <form onSubmit={submitHandler}>
                    <div className='input-group' id='has-flavors'>
                        <label htmlFor=''>Has Flavors</label>
                        <Switch
                            checked={hasFlavors}
                            color='Primary'
                            onClick={() => {
                                setHasFlavors(!hasFlavors);
                            }}
                            name='hasFlavors'
                        />
                    </div>
                    {hasFlavors && (
                        <div className='flavor-adder'>
                            <label htmlFor=''>Add Flavors</label>
                            <div className='add-flavor-input'>
                                <input value={newFlavor} onChange={(e) => setNewFlavor(e.target.value)} />
                                <button type='button' onClick={addFlavorHandler}>
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                    <div className='input-group' id='item-id'>
                        <label htmlFor=''>Item ID</label>
                        <input value={itemID} required onChange={(e) => setItemID(e.target.value.toUpperCase())} />
                    </div>
                    <div className='input-group ' id='brand'>
                        <label htmlFor=''>Brand</label>
                        <select
                            required
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}>
                            {brandOptions()}
                        </select>
                    </div>
                    <div className='input-group' id='category'>
                        <label htmlFor=''>Category</label>
                        <select
                            required
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}>
                            {CategoryOptions()}
                        </select>
                    </div>
                    <div className='input-group' id='packaging'>
                        <label htmlFor=''>Packaging</label>
                        <select
                            required
                            value={packaging}
                            onChange={(e) => {
                                setPackaging(e.target.value);
                            }}>
                            {PackagingOptions()}
                        </select>
                    </div>
                    <div className='input-group' id='size'>
                        <label htmlFor=''>Size</label>
                        <input value={size} required onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div className='input-group' id='price'>
                        <label htmlFor=''>Price</label>
                        <input value={price} type='number' min='1' max='100' step='0.01' required onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className='input-group' id='description'>
                        <label htmlFor=''>Description</label>
                        <input value={description} required onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type='submit' id='submit-btn'>
                        Submit
                    </button>
                    <button type='button' onClick={deleteHandler} id='cancel-btn'>
                        Delete
                    </button>
                </form>
            </div>
        </Container>
    );
};

const Container = styled.div`
    grid-area: preview;
    position: relative;
    .wrapper {
        padding: 16px;
        padding-bottom: 80px;
        overflow: scroll;
        height: 100%;
        position: absolute;
        left: 0;
    }
    header {
        margin-bottom: 40px;
        .back-button {
            font-size: 16px;
            margin-bottom: 40px;
            font-weight: 800;
            display: flex;
            align-items: center;
            cursor: pointer;
            svg {
                margin-right: 16px;
            }
        }
        .page-title {
            font-weight: 700;
            font-size: 24px;
            text-align: center;
        }
    }
    form {
        display: grid;
        grid-gap: 32px 16px;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "A B"
            "C D"
            "E F"
            "G H"
            "I  I"
            "J  K";
        #has-flavors {
            grid-area: A;
        }
        .flavor-adder {
            grid-area: B;
            .add-flavor-input {
                display: grid;
                grid-template-columns: 8fr 2fr;
            }
            button {
                background-color: ${Colors.black};
                color: ${Colors.white};
                border: none;
                border-radius: 0 4px 4px 0;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }
        }
        #item-id {
            grid-area: C;
        }
        #brand {
            grid-area: D;
        }
        #category {
            grid-area: E;
        }
        #packaging {
            grid-area: F;
        }
        #size {
            grid-area: G;
        }
        #price {
            grid-area: H;
        }
        #description {
            grid-area: I;
        }

        label {
            display: block;
            margin-bottom: 16px;

            font-weight: 600;
            font-size: 16px;
            color: ${Colors.black};
        }
        select,
        input {
            height: 56px;
            width: 100%;
            padding: 16px 8px;
            border: none;
            border-radius: 4px;
            background-color: #f5f5f5;
            -webkit-appearance: none;
            font-size: 16px;
        }
        select {
            cursor: pointer;
        }
        button {
            padding: 16px 0px;
            font-size: 16px;
            font-weight: 700;
            border-radius: 4px;
            border: none;
            color: white;
        }
        #submit-btn {
            background-color: ${Colors.green};
            grid-area: J;
        }
        #cancel-btn {
            background-color: ${Colors.red};
            grid-area: K;
        }
    }
`;

const FlavorsContainer = styled.div`
    .title {
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 40px;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
        margin-bottom: 40px;
    }
`;

export default compose(
    firestoreConnect(),
    connect((state) => {
        return {
            inventory: state.Firestore.data.inventory.beverages,
        };
    })
)(withRouter(EditBeverage));
