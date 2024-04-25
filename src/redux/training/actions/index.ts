import { LOCATION_CHANGE } from 'redux-first-history';
import { TrainingFormValue } from '@pages/calendar/types';
import { ErrorAction, ErrorPayloadType, ErrorTypes } from '@redux/error';
import { LoaderAction, LoaderTypes } from '@redux/loader';

import { TrainingAction, TrainingListResponse, TrainingResponse, TrainingTypes } from '../types';

export const setLoadingTraining = (payload: boolean): LoaderAction<boolean> => ({
    type: LoaderTypes.SET_LOADING,
    payload,
});

export const getTraining = (payload?: string) => ({
    type: TrainingTypes.GET_TRAINING,
    payload,
});

export const setTraining = (payload: TrainingResponse[]): TrainingAction<TrainingResponse[]> => ({
    type: TrainingTypes.SET_TRAINING,
    payload,
});

export const getTrainingList = () => ({
    type: LOCATION_CHANGE,
});

export const setTrainiingList = (
    payload: TrainingListResponse[],
): TrainingAction<TrainingListResponse[]> => ({
    type: TrainingTypes.SET_TRAINING_LIST,
    payload,
});

export const postTrainingRequest = (
    payload: TrainingFormValue | TrainingResponse,
): TrainingAction<TrainingFormValue | TrainingResponse> => ({
    type: TrainingTypes.POST_TRAINING_REQUEST,
    payload,
});

export const postTrainingSuccess = (
    payload: TrainingFormValue | TrainingResponse,
): TrainingAction<TrainingFormValue | TrainingResponse> => ({
    type: TrainingTypes.POST_TRAINING_SUCCESS,
    payload,
});

export const putTrainingRequest = (
    payload: Partial<TrainingFormValue>,
): TrainingAction<Partial<TrainingFormValue>> => ({
    type: TrainingTypes.PUT_TRAINING_REQUEST,
    payload,
});

export const putTrainingSuccess = (payload: TrainingResponse) => ({
    type: TrainingTypes.PUT_TRAINING_SUCCESS,
    payload,
});

export const setErrorTraining = (payload: ErrorPayloadType): ErrorAction<ErrorPayloadType> => ({
    type: ErrorTypes.SET_ERROR,
    payload,
});
