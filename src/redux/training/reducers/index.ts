import { updateState } from '@utils/index';

import {
    TrainingAction,
    TrainingListResponse,
    TrainingResponse,
    TrainingState,
    TrainingTypes,
} from '../types';

const initialState: TrainingState = {
    trainings: [],
    trainingsList: [],
    statusCode: undefined,
};

export const trainingReducer = <T>(state = initialState, { type, payload }: TrainingAction<T>) => {
    switch (type) {
        case TrainingTypes.GET_TRAINING: {
            return state;
        }
        case TrainingTypes.SET_TRAINING: {
            return {
                ...state,
                trainings: payload as TrainingResponse[],
            };
        }
        case TrainingTypes.GET_TRAINING_LIST: {
            return state;
        }
        case TrainingTypes.SET_TRAINING_LIST: {
            return {
                ...state,
                trainingsList: payload as TrainingListResponse[],
            };
        }
        
        case TrainingTypes.POST_TRAINING_REQUEST: {
            return { ...state, statusCode: null };
        }
        case TrainingTypes.POST_TRAINING_SUCCESS: {
            return { ...state, trainings: [...state.trainings, payload as TrainingResponse] };
        }

        case TrainingTypes.PUT_TRAINING_REQUEST: {
            return { ...state, statusCode: null };
        }
        case TrainingTypes.PUT_TRAINING_SUCCESS: {
            return { ...state, trainings: updateState(state.trainings, payload as TrainingResponse) };
        }
        default:
            return state;
    }
};
