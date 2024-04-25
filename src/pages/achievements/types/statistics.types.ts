import { Dayjs } from 'dayjs';

export type AverageStatisticsData = {
    key: number,
    value: number;
    frequentExerciseName?: string;
    frequentExercisePercent?: number;
};

export type StatisticsFormatedData = Array<AverageStatisticsData & { date: string }>;
export type StatisticsData = Array<AverageStatisticsData & { date: Dayjs }>;

export type Statistics = {
    sortedData: StatisticsData;
    statisticsData: StatisticsFormatedData;
    totalData: TotalData;
    frequent: FrequentData;
};

export type TotalData = {
    [key: string]: number;
    totalLoad: number;
    totalLoadPerDay: number;
    replaysPerDay: number;
    approachesPerDay: number;
};

export type FrequentData = {
    [key: string]: string | undefined;
    trainingName?: string;
    exerciseName: string;
};

export type Filter = {
    period?: string;
    trainingType?: string;
};
