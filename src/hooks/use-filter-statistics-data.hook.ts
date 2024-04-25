import { useEffect, useState } from 'react';
import { dateShortFormat, ExercisesProperty, filterNameAll, TabsKey } from '@constants/index';
import { Filter, Statistics, StatisticsData } from '@pages/achievements/types/statistics.types';
import { TrainingResponse } from '@redux/training';
import {
    calculateAvrLoad,
    calculateSumOfProperty,
    getExercisesPercent,
    getExercisesPerPeriod,
    getFrequentData,
    getFrequentExercisePerDay,
    getTotalLoad,
} from '@utils/index';
import { getMonthRange, getWeekRange } from '@utils/statistics/get-statistics-date-range';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const useFilterStatisticsData = (trainings: TrainingResponse[]) => {
    const [statistics, setStatistics] = useState<Partial<Statistics> | null>(null);
    const [filter, setFilter] = useState<Filter>({
        period: TabsKey.WeekStatistics,
        trainingType: filterNameAll,
    });

    const calculateLoadPerPeriod = (data: number) => {
        const dataPerPeriod = data / Number(filter.period);

        return dataPerPeriod ? Number(dataPerPeriod.toFixed(1)) : 0;
    };

    const getStatisticsDataPerDay = (dateRange: Dayjs[], selectTrainings: TrainingResponse[]) =>
        dateRange.map((currentDate, index) => {
            const currentExercises = getExercisesPerPeriod(currentDate, selectTrainings);

            const avrPayload = calculateAvrLoad(currentExercises);
            const { frequentExerciseName, frequentExercisePercent } = {
                ...getFrequentExercisePerDay(currentExercises),
            };

            return {
                key: index,
                date: currentDate,
                value: avrPayload,
                frequentExerciseName,
                frequentExercisePercent,
            };
        });

    const setFrequentData = (dateRange: Dayjs[], selectTrainings: TrainingResponse[]) => {
        const currentExercises = dateRange.flatMap((currentDate) =>
            getExercisesPerPeriod(currentDate, selectTrainings),
        );

        const currentTraining = dateRange.flatMap((currentDate) =>
            selectTrainings.filter((tr) => dayjs(tr.date).isSame(currentDate, 'day')),
        );

        const frequent = {
            trainingName:
                filter.trainingType === filterNameAll
                    ? getFrequentData(currentTraining).frequentExerciseName
                    : undefined,
            exerciseName: getFrequentData(currentExercises).frequentExerciseName,
        };

        setStatistics((prev) => ({ ...prev, frequent }));
    };

    const setTotalDataPerPeriod = (dateRange: Dayjs[], selectTrainings: TrainingResponse[]) => {
        const currentExercises = dateRange.flatMap((currentDate) =>
            getExercisesPerPeriod(currentDate, selectTrainings),
        );
        const totalLoad = getTotalLoad(currentExercises);
        const totalLoadPerDay = calculateLoadPerPeriod(totalLoad);

        const replaysPerDay = calculateSumOfProperty(currentExercises, ExercisesProperty.replays);
        const approachesPerDay = calculateSumOfProperty(
            currentExercises,
            ExercisesProperty.approaches,
        );

        const totalData = {
            totalLoad,
            totalLoadPerDay,
            replaysPerDay,
            approachesPerDay,
        };

        setStatistics((prev) => ({ ...prev, totalData }));
    };

    const setDataWithFormat = (dataValue: Statistics['sortedData']) => {
        const statisticsData = dataValue.map((item) => ({
            ...item,
            date: item.date.format(dateShortFormat),
        }));

        setStatistics((prev) => ({
            ...prev,
            statisticsData,
        }));

        return statisticsData;
    };

    const setSortedDataWithWeekDay = (dataValue: Statistics['sortedData']) => {
        const sortedWeekStatisticsData = dataValue.sort(
            (a, b) => a.date.isoWeekday() - b.date.isoWeekday(),
        );

        setStatistics((prev) => ({
            ...prev,
            sortedData: sortedWeekStatisticsData,
        }));

        return sortedWeekStatisticsData;
    };

    const setDataWithExercisePercent = (statisticsData: StatisticsData) => {
        const updatedData = getExercisesPercent(statisticsData);

        setStatistics((prev) => {
            const sortedData = prev?.sortedData || [];

            return {
                ...prev,
                sortedData: [...sortedData, ...updatedData],
            };
        });

        return updatedData;
    };

    const setStatisticsData = (dateRange: Dayjs[], selectTrainings: TrainingResponse[]) => {
        const statisticsData = getStatisticsDataPerDay(dateRange, selectTrainings);
        const dataWithPercent = setDataWithExercisePercent(statisticsData);

        setSortedDataWithWeekDay(dataWithPercent);
        setDataWithFormat(statisticsData);
        setTotalDataPerPeriod(dateRange, selectTrainings);
        setFrequentData(dateRange, selectTrainings);
    };

    const handleFilterData = () => {
        const dateRange =
            filter.period === TabsKey.WeekStatistics ? getWeekRange() : getMonthRange();
        const selectTrainings =
            filter.trainingType === filterNameAll
                ? trainings
                : trainings.filter((training) => training.name === filter.trainingType);

        if (selectTrainings.length) {
            setStatisticsData(dateRange, selectTrainings);
        } else {
            setStatistics(null);
        }
    };

    useEffect(() => {
        if (trainings.length) {
            handleFilterData();
        }
    }, [filter, trainings]);

    return { statistics, filter, setFilter };
};
