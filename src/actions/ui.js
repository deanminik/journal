import { types } from "../types/types";

export const setError = (err) => ({ //err será el error que estoy recibiendo y el payload lo almacena por mi 
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError,

});


export const startLoading = () => ({
    type: types.uiStartLoading
})
export const finishLoading = () => ({
    type: types.uiFinishLoading
})