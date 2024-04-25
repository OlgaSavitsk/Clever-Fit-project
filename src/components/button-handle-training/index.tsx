import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DrawerMode } from '@constants/trainings.constant';
import { TrainingFormValue } from '@pages/calendar/types';
import { trainingActions, TrainingResponse } from '@redux/training';
import dayjs, { Dayjs } from 'dayjs';


export const useTrainings = () => {
    const dispatch = useDispatch()

    const onCreate = useCallback(async (createdTraining: TrainingFormValue | TrainingResponse) => {
        dispatch(trainingActions.postTrainingRequest(createdTraining))
        dispatch(trainingActions.getTraining())
    }, [dispatch])

    const onUpdate = useCallback(async (createdTraining: TrainingFormValue | TrainingResponse) => {
        let updatedTraining = { ...createdTraining }

        if ((createdTraining.date as unknown as Dayjs).isBefore(dayjs())) {
            updatedTraining = {
                ...createdTraining,
                isImplementation: true
            }
        }
        dispatch(trainingActions.putTrainingRequest(updatedTraining))
        dispatch(trainingActions.getTraining())
    }, [dispatch])

    const handleCreate = useCallback((mode: DrawerMode,
        createdTraining: TrainingFormValue | TrainingResponse,) => {
        if (mode === DrawerMode.edit) { onUpdate(createdTraining) }
        else onCreate(createdTraining)
    }, [onCreate, onUpdate])

    return [handleCreate];
}