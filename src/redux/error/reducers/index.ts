import { ErrorAction, ErrorState, ErrorTypes } from '../types';

const initialState: ErrorState = {
    statusCode: undefined,
};

export const errorReducer = <T>(state = initialState, { type, payload }: ErrorAction<T>) => {
    switch (type) {
        case ErrorTypes.SET_ERROR: {
            return { ...state, statusCode: payload };
        }
        default:
            return state;
    }
};
