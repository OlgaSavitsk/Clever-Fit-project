import { AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';

export enum UserTypes {
    GET_USER = 'GET_USER',
    SET_USER = 'SET_USER',
    UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
    UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST',
    UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS',
    UPLOAD_PROGRESS = 'UPLOAD_PROGRESS',
    GET_TARIFF_LIST = 'GET_TARIFF_LIST',
    SET_TARIFF_LIST = 'SET_TARIFF_LIST',
    PAYMENT_REQUEST = 'PAYMENT_REQUEST',
    PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
}

export type UserState = {
    user: UserResponse | null;
    progress: number;
    tariffList: TariffListResponse[];
    paymentStatus: Pick<AxiosResponse, 'status'> | null;
    statusCode: number | undefined;
};

export type UserAction<Payload> = {
    type: UserTypes;
    payload: Payload;
};

export type UserReducer = (state: UserState, actions: UserAction<UserState>) => UserState;

export type UserResponse = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: Dayjs;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: Tariff;
};

export type Tariff = {
    tariffId: string;
    expired: Dayjs;
};

export type UserPayload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: Dayjs;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
};

export type UploadPayload = {
    data: File;
};

export type UploadResponse = {
    name: string;
    url: string;
};

export type TariffListResponse = {
    _id: string;
    name: string;
    periods: TariffPeriod[];
};

type TariffPeriod = {
    text: string;
    cost: number;
    days: number;
};

export type TariffPayment = {
    tariffId: string;
    days: number;
};
