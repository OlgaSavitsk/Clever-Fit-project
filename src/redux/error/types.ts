import { HttpStatusCode } from '@constants/index';

export enum ErrorTypes {
    SET_ERROR = 'SET_ERROR',
}

export type ErrorState = {
    statusCode?: ErrorPayloadType;
};

export type ErrorPayloadType = number | HttpStatusCode | undefined | null;

export type ErrorAction<Payload> = {
    type: ErrorTypes;
    payload: Payload;
};
