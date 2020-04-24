export const dispatchErrorSubmitData = (errorData) => {
    return (dispatch) => {
        dispatch(errorData);
    }
};
