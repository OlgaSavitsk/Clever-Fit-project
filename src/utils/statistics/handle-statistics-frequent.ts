import { ExercisesProperty } from '@constants/index';
import { AverageStatisticsData, StatisticsData } from '@pages/achievements/types/statistics.types';
import { Exercises, TrainingResponse } from '@redux/training';

import { calculateSumOfProperty } from './handle-statistics-data';

type Exercise = TrainingResponse | Exercises;

const calculateExercises = (data: Exercise[]) =>
    data.reduce((acc: { [key: string]: number }, { name }: Exercise) => {
        acc[name] = (acc[name] || 0) + 1;

        return acc;
    }, {});

export const findFrequentExercise = (exercises: { [key: string]: number }) => {
    let maxValueName = '';
    let frequentExercisePercent = 0;

    Object.entries(exercises).forEach(([name, count]) => {
        if (count > frequentExercisePercent) {
            maxValueName = name;
            frequentExercisePercent = count;
        }
    });

    return { frequentExerciseName: maxValueName, frequentExercisePercent };
};

export const getFrequentData = (data: Exercise[]) => {
    const exercises = calculateExercises(data);

    return findFrequentExercise(exercises);
};

export const getFrequentExercisePerDay = (exercises: Exercises[]) => {
    const frequentExercise = exercises.length ? getFrequentData(exercises) : undefined;

    return frequentExercise;
};

const calculateTotalAmount = (statisticsData: StatisticsData) =>
    calculateSumOfProperty(statisticsData, ExercisesProperty.frequentExercisePercent);

const calculateAveragePercent = (percent: number, total: number) =>
    percent ? percent / total : undefined;

const updateTransformData = (
    transformedData: AverageStatisticsData[],
    data: AverageStatisticsData,
    avrPercent?: number,
) => {
    const exist = transformedData.find(
        ({ frequentExerciseName: existName }) => data.frequentExerciseName === existName,
    );

    const avrPercentOptions = avrPercent ?? 0;

    if (exist?.frequentExercisePercent) {
        exist.frequentExercisePercent += avrPercentOptions;
        transformedData.push({
            ...data,
            frequentExercisePercent: undefined,
        });
    } else {
        transformedData.push({
            ...data,
            frequentExercisePercent: avrPercent,
        });
    }

    return transformedData;
};

export const getExercisesPercent = (statisticsData: StatisticsData) => {
    const totalAmount = calculateTotalAmount(statisticsData);
    const transformedData: StatisticsData = [];

    statisticsData.forEach((data) => {
        const { frequentExercisePercent } = data;
        const avrPercent = calculateAveragePercent(frequentExercisePercent ?? 0, totalAmount);

        updateTransformData(transformedData, data, avrPercent);
    });

    return transformedData;
};
