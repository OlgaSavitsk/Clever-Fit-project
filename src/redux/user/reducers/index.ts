import {
    TariffListResponse,
    UploadResponse,
    UserAction,
    UserResponse,
    UserState,
    UserTypes,
} from '..';

const initialState: UserState = {
    user: null,
    progress: 0,
    tariffList: [],
    paymentStatus: null,
    statusCode: undefined,
};

export const userReducer = <T>(state = initialState, { type, payload }: UserAction<T>) => {
    switch (type) {
        case UserTypes.GET_USER: {
            return state;
        }
        case UserTypes.SET_USER: {
            return {
                ...state,
                user: payload as UserResponse,
            };
        }
        case UserTypes.UPDATE_USER_REQUEST: {
            return { ...state, statusCode: null };
        }
        case UserTypes.UPDATE_USER_SUCCESS: {
            return { ...state, user: payload };
        }     
        case UserTypes.PAYMENT_REQUEST: {
            return state;
        }
        case UserTypes.PAYMENT_SUCCESS: {
            return { ...state, paymentStatus: payload };
        }
        
        case UserTypes.UPLOAD_FILE_REQUEST: {
            return state;
        }
        case UserTypes.UPLOAD_FILE_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    imgSrc: `https://training-api.clevertec.ru${(payload as UploadResponse).url}`,
                },
            };
        }
        case UserTypes.UPLOAD_PROGRESS: {
            return {
                ...state,
                progress: payload,
            };
        }
        case UserTypes.GET_TARIFF_LIST: {
            return state;
        }
        case UserTypes.SET_TARIFF_LIST: {
            return {
                ...state,
                tariffList: payload as TariffListResponse,
            };
        }
        default:
            return state;
    }
};
