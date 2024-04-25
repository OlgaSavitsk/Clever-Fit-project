import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { trainingActions } from '@redux/training';

export const useHandleRequestTrainings = () => {
    const dispatch = useDispatch();

    const handleRequest = useCallback(
        (path: string) => {
            dispatch(trainingActions.getTraining(path));
            dispatch(trainingActions.getTrainingList());
        },
        [dispatch],
    );

    return { handleRequest };
};
