import { DownOutlined } from '@ant-design/icons';
import { ColumnConfig } from '@ant-design/plots';
import { dateShortFormat } from '@constants/index';
import { StatisticsData } from '@pages/achievements/types/statistics.types';
import dayjs from 'dayjs';

export const formatWeekDateRange = (weekArray: StatisticsData) => {
    const start = dayjs(weekArray[0].date).format(dateShortFormat);
    const end = dayjs(weekArray[weekArray.length - 1].date).format(dateShortFormat);

    return `Неделя ${start}-${end}`;
};

export const splitMonthToWeek = (chunks: number, sortedData?: StatisticsData): StatisticsData[] => {
    if (!sortedData) {
        return [];
    }

    return Array.from({ length: chunks }, (_, chunkIndex) =>
        sortedData.filter((_, index) => index % chunks === chunkIndex),
    ).reverse();
};

export const configPlot: ColumnConfig = {
    scrollbar: {
        x: {
            ratio: 0.5,
        },
    },
};

export const expandIcon = ({ isActive }: { isActive?: boolean }) => (
    <DownOutlined rotate={isActive ? 180 : 0} />
)
