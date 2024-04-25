import { TrainingPalsResponse } from '@redux/pals';

const statusOrder = ['accepted', 'pending', 'rejected'];

export const getSortedTraining = (data: TrainingPalsResponse[]): TrainingPalsResponse[] => {
    const sorted = [...data].sort(
        (a: TrainingPalsResponse, b: TrainingPalsResponse) =>
            statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status) ||
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    );

    return sorted;
};
