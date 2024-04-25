import { InviteResponse, TrainingPalsResponse } from '@redux/pals';
import { TrainingResponse } from '@redux/training';

export const updateState = (state: TrainingResponse[], payload: TrainingResponse) => {
    const index: number = state.findIndex((val) => val._id === payload._id);

    const updatedState = [...state];

    updatedState[index] = { ...payload };

    return updatedState;
};

export const updatePals = (state: TrainingPalsResponse[], payload: InviteResponse) => {
    const index: number = state.findIndex((val) => val.id === payload.to._id);

    const updatedState = [...state];

    updatedState[index] = { ...state[index], status: payload.status };

    return updatedState;
};
