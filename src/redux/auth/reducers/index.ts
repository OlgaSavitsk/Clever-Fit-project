import { AuthAction, AuthState, AuthTypes } from '../types';

const initialState: AuthState = {
    token: '',
    isLoading: false,
    statusCode: null,
};

export const authReducer = <T>(state = initialState, { type, payload }: AuthAction<T>) => {
    switch (type) {
        case AuthTypes.SIGNUP_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.SIGNUP_SUCCESS: {
            return { ...state, isLoading: false, statusCode: payload };
        }
        case AuthTypes.SIGNIN_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.SIGNIN_SUCCESS: {
            return { ...state, isLoading: false, token: payload };
        }
        case AuthTypes.CHECKEMAIL_REQUEST: {
            return { ...state, isLoading: true, statusCode: null };
        }
        case AuthTypes.CHECKEMAIL_SUCCESS: {
            return { ...state, isLoading: false };
        }
        case AuthTypes.CONFIRMEMAIL_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.CONFIRMEMAIL_SUCCESS: {
            return { ...state, isLoading: false };
        }
        case AuthTypes.CHANGEPASSWORD_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.CHANGEPASSWORD_SUCCESS: {
            return { ...state, isLoading: false, statusCode: payload };
        }
        case AuthTypes.AUTH_ERROR: {
            return { ...state, isLoading: false, statusCode: payload };
        }
        default:
            return state;
    }
};
