import { Exercises, TrainingResponse } from '@redux/training';
import dayjs, { Dayjs } from 'dayjs';

export const getExercisesPerPeriod = (currentDate: Dayjs, selectTrainings: TrainingResponse[]) =>
    selectTrainings
        .filter((tr) => dayjs(tr.date).isSame(currentDate, 'day'))
        .flatMap((training) => training.exercises);

export const getTotalLoad = (currentExercises: Exercises[]) => {
    const loadPerExercise = currentExercises.map(
        (exercise) => exercise.approaches * exercise.replays * exercise.weight || 0,
    );
    const generalLoad = loadPerExercise.reduce((item, curIndex) => item + curIndex, 0);

    return generalLoad;
};

export const calculateSumOfProperty = <T>(currentExercises: T[], key: keyof T): number =>
    currentExercises.reduce((sum, value: T) => {
        const propertyValue = value[key];

        if (typeof propertyValue === 'number') {
            return sum + propertyValue;
        }

        return sum;
    }, 0);

export const calculateAvrLoad = (exercises: Exercises[]) => {
    if (!exercises || exercises.length === 0) {
        return 0;
    }
    const totalLoad = getTotalLoad(exercises);
    const avrPayload = totalLoad / exercises.length || 0;

    return avrPayload;
};
