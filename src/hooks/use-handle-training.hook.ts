import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DrawerMode } from '@constants/trainings.constant';
import { TrainingFormValue } from '@pages/calendar/types';
import { palsActions, TrainingPalsResponse } from '@redux/pals';
import { trainingActions, TrainingResponse } from '@redux/training';
import dayjs, { Dayjs } from 'dayjs';

type TrainingPayload = {
    mode: DrawerMode;
    createdTraining: TrainingFormValue | TrainingResponse;
    userFrom?: TrainingPalsResponse;
};

export const useTrainings = () => {
    const dispatch = useDispatch();

    const onCreate = useCallback(
        async (createdTraining: TrainingFormValue | TrainingResponse) => {
            dispatch(trainingActions.postTrainingRequest(createdTraining));
            dispatch(trainingActions.getTraining());
        },
        [dispatch],
    );

    const onUpdate = useCallback(
        async (createdTraining: TrainingFormValue | TrainingResponse) => {
            let updatedTraining = { ...createdTraining };

            if ((createdTraining.date as unknown as Dayjs).isBefore(dayjs())) {
                updatedTraining = {
                    ...createdTraining,
                    isImplementation: true,
                };
            }
            dispatch(trainingActions.putTrainingRequest(updatedTraining));
            dispatch(trainingActions.getTraining());
        },
        [dispatch],
    );

    const onCreateInvite = useCallback(
        (createdTraining: TrainingFormValue | TrainingResponse, userFrom: TrainingPalsResponse) => {
            dispatch(
                palsActions.createInviteRequest({ id: userFrom.id, training: createdTraining }),
            );
        },
        [dispatch],
    );

    const handleCreate = useCallback(
        ({ mode, createdTraining, userFrom }: TrainingPayload) => {
            if (mode === DrawerMode.edit) onUpdate(createdTraining);
            else if(mode === DrawerMode.create) onCreate(createdTraining);
            else if (userFrom) onCreateInvite(createdTraining, userFrom);
        },
        [onCreate, onCreateInvite, onUpdate],
    );

    return [handleCreate];
};
