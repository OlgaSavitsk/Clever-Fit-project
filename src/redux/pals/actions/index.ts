import { ErrorAction, ErrorPayloadType, ErrorTypes } from '@redux/error';
import { LoaderAction, LoaderTypes } from '@redux/loader';

import {
    InvitePayload,
    InviteResponse,
    InviteResponseRequest,
    JointListPayload,
    PalsAction,
    PalsTypes,
    TrainingPalsResponse,
} from '../types';

export const setLoadingPals = (payload: boolean): LoaderAction<boolean> => ({
    type: LoaderTypes.SET_LOADING,
    payload,
});

export const getTrainingPals = () => ({
    type: PalsTypes.GET_TRAINING_PALS,
});

export const setTrainingPals = (
    payload: TrainingPalsResponse[],
): PalsAction<TrainingPalsResponse[]> => ({
    type: PalsTypes.SET_TRAINING_PALS,
    payload,
});

export const getInvite = () => ({
    type: PalsTypes.GET_INVITE,
});

export const setInvite = (payload: InviteResponse[]): PalsAction<InviteResponse[]> => ({
    type: PalsTypes.SET_INVITE,
    payload,
});

export const getUserJointList = (payload?: JointListPayload) => ({
    type: PalsTypes.GET_USER_JOINT_LIST,
    payload,
});

export const setUserJointList = (
    payload: TrainingPalsResponse[],
): PalsAction<TrainingPalsResponse[]> => ({
    type: PalsTypes.SET_USER_JOINT_LIST,
    payload,
});

export const createInviteRequest = (payload: InvitePayload) => ({
    type: PalsTypes.CREATE_INVITE_REQUEST,
    payload,
});

export const createInviteSuccess = (payload: InviteResponse): PalsAction<InviteResponse> => ({
    type: PalsTypes.CREATE_INVITE_SUCCESS,
    payload,
});

export const responseInviteRequest = (payload: InviteResponseRequest) => ({
    type: PalsTypes.RESPONSE_INVITE_REQUEST,
    payload,
});

export const responseInviteSuccess = () => ({
    type: PalsTypes.RESPONSE_INVITE_SUCCESS,
});

export const cancelInviteRequest = (payload: InviteResponseRequest) => ({
    type: PalsTypes.CANCEL_INVITE_REQUEST,
    payload,
});

export const cancelInviteSuccess = (payload: InviteResponse) => ({
    type: PalsTypes.CANCEL_INVITE_SUCCESS,
    payload
});

export const setErrorPals = (payload: ErrorPayloadType): ErrorAction<ErrorPayloadType> => ({
    type: ErrorTypes.SET_ERROR,
    payload,
});
