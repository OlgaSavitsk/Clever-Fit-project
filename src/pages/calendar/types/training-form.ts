import { Exercises, TrainingResponse } from '@redux/training';

export type TrainingForm = {
    trainings: TrainingFormValue[] | TrainingResponse[];
};

export type TrainingFormValue = {
    name: string;
    date: string | number | undefined;
    exercises: Exercises[];
    isImplementation?: boolean;
};
