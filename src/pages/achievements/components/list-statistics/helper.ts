import { FrequentData, TotalData } from '@pages/achievements/types/statistics.types';

export const cardsWithStatisticsContext = (
    configData: Record<string, string>,
    value?: TotalData | FrequentData,
) =>
    Object.keys(configData).map((key: string, index: number) => ({
        index,
        context: configData[key],
        value: value?.[key],
    }));
