import { create } from "zustand";


export const userInputState = create(() => {
    return {
        userInputs: null,
    }
});


export const modelResponseState = create(() => {
    return {
        responseFromBackendFastAPI: null,
    }
});