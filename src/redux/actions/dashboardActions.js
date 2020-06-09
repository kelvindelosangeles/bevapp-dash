export const test = async (phrase) => {
    setTimeout(() => {
        return {
            type: "TEST_ACTION",
            payload: phrase,
        };
    }, 2000);
};
