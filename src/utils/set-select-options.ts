import { TrainingListResponse } from '@redux/training';

export const setSelectOptions = (trainingsList: TrainingListResponse[]) =>
    trainingsList.map((training) => ({ label: training.name, value: training.name }));
