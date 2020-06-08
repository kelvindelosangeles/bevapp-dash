export const test = (phrase) => {
    return {
        type: "TEST_ACTION",
        payload: phrase,
    };
};
