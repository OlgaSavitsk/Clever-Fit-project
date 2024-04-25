import { LOCATION_CHANGE } from 'redux-first-history';
import { ErrorAction, ErrorPayloadType, ErrorTypes } from '@redux/error';
import { LoaderAction, LoaderTypes } from '@redux/loader';

import {
    TariffListResponse,
    TariffPayment,
    UploadPayload,
    UploadResponse,
    UserAction,
    UserPayload,
    UserResponse,
    UserTypes,
} from '..';

export const setLoadingUser = (payload: boolean): LoaderAction<boolean> => ({
    type: LoaderTypes.SET_LOADING,
    payload,
});

export const getUser = () => ({
    type: UserTypes.GET_USER,
});

export const setUser = (payload: UserResponse): UserAction<UserResponse> => ({
    type: UserTypes.SET_USER,
    payload,
});

export const getTrainingList = () => ({
    type: LOCATION_CHANGE,
});

export const putUserRequest = (
    payload: Partial<UserPayload>,
): UserAction<Partial<UserPayload>> => ({
    type: UserTypes.UPDATE_USER_REQUEST,
    payload,
});

export const putUserSuccess = (payload: UserResponse) => ({
    type: UserTypes.UPDATE_USER_SUCCESS,
    payload,
});

export const uploadFileRequest = (payload: UploadPayload): UserAction<Partial<UploadPayload>> => ({
    type: UserTypes.UPLOAD_FILE_REQUEST,
    payload,
});

export const uploadFileSuccess = (payload: UploadResponse) => ({
    type: UserTypes.UPLOAD_FILE_SUCCESS,
    payload,
});

export const paymentTariffRequest = (payload: TariffPayment): UserAction<Partial<TariffPayment>> => ({
    type: UserTypes.PAYMENT_REQUEST,
    payload,
});

export const paymentTariffSuccess = (payload: number | null) => ({
    type: UserTypes.PAYMENT_SUCCESS,
    payload,
});

export const uploadProgress = (payload: number) => ({
    type: UserTypes.UPLOAD_PROGRESS,
    payload,
});

export const getTariffList = () => ({
    type: UserTypes.GET_TARIFF_LIST,
});

export const setTariffList = (payload: TariffListResponse): UserAction<TariffListResponse> => ({
    type: UserTypes.SET_TARIFF_LIST,
    payload,
});

export const setErrorUser = (payload: ErrorPayloadType): ErrorAction<ErrorPayloadType> => ({
    type: ErrorTypes.SET_ERROR,
    payload,
});
